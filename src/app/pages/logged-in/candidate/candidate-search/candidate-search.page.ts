import {Component, ViewChild, OnInit, ChangeDetectorRef, ViewRef, OnDestroy} from '@angular/core';
import { NavController, Platform, MenuController, PopoverController, IonContent, AlertController } from '@ionic/angular';
// import { Storage } from '@ionic/storage';
import { environment } from '../../../../../environments/environment';
// service
import { AuthService } from '../../../../providers/auth.service';
import { CandidateService } from '../../../../providers/logged-in/candidate.service';
import { TranslateLabelService } from '../../../../providers/translate-label.service';
import { EventService } from '../../../../providers/event.service';
import { CandidateIdCardService } from 'src/app/providers/logged-in/candidate.id.card.service';
import { CandidateSearchService } from 'src/app/services/candidate-search.service';
//pages
import { CandidateMergeSelectPage } from '../candidate-merge-select/candidate-merge-select.page';
import { AnalyticsService } from 'src/app/providers/analytics.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';



@Component({
  selector: 'app-candidate-search',
  templateUrl: './candidate-search.page.html',
  styleUrls: ['./candidate-search.page.scss'],
})
export class CandidateSearchPage implements OnInit, OnDestroy {

  @ViewChild(IonContent, { static: true }) content: IonContent;

  public downloading;
  public merging;
  public eleInfinite;
  public loading: boolean = false;
  public isMobile: boolean;
  public nbHits: number | null = null;
  public nbPages: number = 0;
  public page: number = 0;
  public refreshingCandidates = false;
  public noCandidateList = false;
  public showSearchBox = true;
  public scrollPosition = 0;
  public borderLimit = false;
  public showFilter = false;
  public candidates: any[] = [];
  public searchQuery: string = '';
  public allCandidates: any[] = []; // Accumulated results for infinite scroll
  public paginationLoading: boolean = false;

  // Track search session to detect new searches vs pagination
  private currentSearchSession: string = '';
  private lastPage: number = -1;

  private searchSubject = new Subject<string>();
  private subscriptions: Subscription[] = [];

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public platform: Platform,
    public auth: AuthService,
    public candidateService: CandidateService,
    public candidateIdCardService: CandidateIdCardService,
    public changeDetector: ChangeDetectorRef,
    public eventService: EventService,
    public translateService: TranslateLabelService,
    public analyticService: AnalyticsService,
    public popoverCtrl: PopoverController,
    public _menuCtrl: MenuController,
    public searchService: CandidateSearchService
  ) {
    // Setup debounced search
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.searchService.setQuery(query);
      this.performSearch();
    });
  }

  ngOnInit() {
    this.analyticService.page('Candidate Search Page');

    this.platform.ready().then(() => {
      if (this.platform.is('mobile')) {
        this.isMobile = true;
      }
    });

    // Subscribe to search service observables
    this.subscriptions.push(
      this.searchService.results$.subscribe(results => {
        if (results) {
          const currentState = this.searchService.getState();
          
          // Create a unique identifier for this search session (query + filters)
          const searchSessionKey = JSON.stringify({
            query: currentState.query || '',
            filters: currentState.filters || {}
          });

          // Check if this is a new search (different query/filters) or pagination (same query/filters, different page)
          const isNewSearch = searchSessionKey !== this.currentSearchSession;
          const isPagination = !isNewSearch && results.pagination.page > this.lastPage && this.lastPage >= 0;

          if (isNewSearch) {
            // New search or filter - replace results
            this.allCandidates = results.hits;
            this.candidates = results.hits;
            this.currentSearchSession = searchSessionKey;
            this.lastPage = results.pagination.page;
          } else if (isPagination) {
            // Pagination - append results
            this.allCandidates = [...this.allCandidates, ...results.hits];
            this.candidates = this.allCandidates;
            this.lastPage = results.pagination.page;
          } else {
            // Same page or going backwards - just update the page number
            this.lastPage = results.pagination.page;
          }
          
          this.nbHits = results.pagination.total;
          this.nbPages = results.pagination.totalPages;
          this.page = results.pagination.page;
          this.noCandidateList = results.pagination.total === 0;
          this.showSearchBox = !this.noCandidateList || (this.searchQuery && this.searchQuery.length > 0);
          this.paginationLoading = false;
        }
      })
    );

    this.subscriptions.push(
      this.searchService.loading$.subscribe(loading => {
        const currentState = this.searchService.getState();
        // Only set main loading state for new searches (page 0), not for pagination
        if (currentState.page === 0) {
          this.loading = loading;
          this.refreshingCandidates = loading;
        }
        // For pagination, loading is handled by paginationLoading
      })
    );

    // Perform initial search
    this.performSearch();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ionViewWillEnter() {
    this.content.scrollToPoint(0, this.scrollPosition);
  }

  ionViewDidEnter() {
    // Refresh search if needed
    this.performSearch();
  }

  ionViewWillLeave() {
    this.content.getScrollElement().then(ele => {
      this.scrollPosition = ele.scrollTop;
    });
  }

  /**
   * Merge to account
   */
  async merge(e) {

    if (this.candidateService.candidates.length != 2) {
      const prompt = await this.alertCtrl.create({
        message: 'Please select any 2 candidates',
        buttons: ['Okay']
      });
      prompt.present();

      return false;
    }

    const popover = await this.popoverCtrl.create({
      component: CandidateMergeSelectPage,
      event: e,
      cssClass: 'candidate-merge-select'
    });

    popover.onDidDismiss().then(e => {

      if(!e.data || !e.data.candidate) {
        return false;
      }

      let source;

      if(e.data.candidate.candidate_id == this.candidateService.candidates[1].candidate_id) {
        source = this.candidateService.candidates[0].candidate_id;
      } else {
        source = this.candidateService.candidates[1].candidate_id;
      }

      this.merging = true;

      this.candidateService.merge(source, e.data.candidate.candidate_id).subscribe(response => {
      }, (err) => {
      }, () => {
        this.merging = false;

        this.deselect();
        
        this.refreshCandidates();
      });
    });
    popover.present();
  }


  /**
   * Generate id cards
   */
  async generate() {

    if (this.candidateIdCardService.candidates.length == 0) {
      const prompt = await this.alertCtrl.create({
        message: 'Please select candidate(s)',
        buttons: ['Ok']
      });
      prompt.present();

      return false;
    }

    this.downloading = true;

    this.candidateIdCardService.generate(this.candidateIdCardService.candidates).subscribe(async response => {
      if (response.operation == "success") {
        this.navCtrl.navigateForward('/candidate-id-request/' + response.cir_uuid);
      } else {
        const alert = await this.alertCtrl.create({ 
          message: response.message,
          buttons: ['Okay']
        });
        alert.present();
      }
    }, (err) => {
    }, () => {
      this.downloading = false;
      this.deselect();
    });
  }

  deselect() {
    this.candidateService.candidates = [];
    this.candidateIdCardService.candidates = [];

    this.eventService.clearCandidateSelection$.next({});
  }

  /**
   * Open filter for mobile users
   */
  openFilter() {
    this.showFilter = true;
  }

  dismiss() {
    this.showFilter = false;
  }

  /**
   * Handle search input with debouncing
   */
  onSearch(event) {
    this.searchQuery = event.target.value;
    // Don't reset allCandidates here - let the results subscription handle it based on search session
    this.searchSubject.next(event.target.value);
  }

  /**
   * Perform search using CandidateSearchService
   */
  async performSearch() {
    try {
      await this.searchService.search();
    } catch (error) {
      this._handleError(error);
    }
  }


  /**
   * Handles Caught Errors from All Authorized Requests Made to Server
   * @returns {Observable}
   */
  public _handleError(error: any) {

    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    // Handle No Internet Connection Error
    if (error.status == 0 || !navigator.onLine) {
      return this.eventService.internetOffline$.next({});
    }

    // Handle internal server error - 500 or 400
    if (error.status === 500) {
      console.error(error);
      return this.eventService.error500$.next({});
    }

    if (error.status === 404) {
      return this.eventService.error404$.next({});
    }

    alert('Error: ' + errMsg);
  }

  /**
   * Load more results (infinite scroll)
   */
  doInfinite(event) {
    // Prevent multiple simultaneous requests
    if (this.loading || this.paginationLoading) {
      if (event) {
        event.target.complete();
      }
      return;
    }

    // Check if we've reached the last page
    if (this.page >= this.nbPages - 1) {
      if (event) {
        event.target.complete();
        event.target.disabled = true;
      }
      return;
    }
    
    // Set pagination loading state
    this.paginationLoading = true;
    
    // Increment page and search
    const nextPage = this.page + 1;
    this.searchService.setPage(nextPage);
    
    this.performSearch().then(() => {
      if (event) {
        event.target.complete();
      }
      this.paginationLoading = false;
    }).catch((error) => {
      console.error('Error loading more results:', error);
      if (event) {
        event.target.complete();
      }
      this.paginationLoading = false;
    });
  }

  /**
   * Load more results (pagination) - legacy method
   */
  loadMore() {
    this.doInfinite(null);
  }

  /**
   * When its selected
   */
  rowSelected(model) {
    this.navCtrl.navigateForward('candidate-view/' + model.candidate_id, {
      state: {
        model
      }
    });
  }


  /**
   * Refresh list
   */
  async refreshCandidates() {
    this.allCandidates = [];
    this.searchService.setPage(0);
    this.searchService.setQuery('');
    this.searchQuery = '';
    await this.performSearch();
  }

  logScrolling(e) {
    if(e.target) {
      this.borderLimit = e.target.scrollTop > 20;
    } else {
      this.borderLimit = (e.detail.scrollTop > 20);
    }
  }
  
  allCandidate() {
    this.navCtrl.navigateForward('/candidate-list');
  }
}
