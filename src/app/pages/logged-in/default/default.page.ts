import { Component, OnInit } from '@angular/core';
import {LoadingController, NavController} from "@ionic/angular";

//services
import {EventService} from "src/app/providers/event.service";
import {StatisticService} from "src/app/providers/logged-in/statistic.service";

@Component({
  selector: 'app-default',
  templateUrl: './default.page.html',
  styleUrls: ['./default.page.scss'],
})
export class DefaultPage implements OnInit {

  public statistics: any;

  constructor(
    public navCtrl: NavController,
    public statisticService: StatisticService,
    private _loadingCtrl: LoadingController,
    private _events: EventService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  /**
   * load current data
   */
  async loadData() {
    // Load list of country
    let loader = await this._loadingCtrl.create();
    loader.present();

    this.statisticService.get().subscribe(response => {
        this.statistics = response;
        this._events.expiredIdCard$.next();
        this._events.printIdCard$.next(this.statistics.id_need_generated);
      },
      error => {},
      () => {loader.dismiss();}
    );
  }

  /**
   * show expired ids page
   */
  showExpiredIDs() {
    this.navCtrl.navigateForward('expired-id');
  }

  /**
   * show candidate which required to generate id
   */
  showCandidatesRequireNewID() {
    this.navCtrl.navigateForward('generate-id');
  }

  /**
   * show assigned candidate page
   */
  showAssignedCandidates() {
    this.navCtrl.navigateForward('candidate-list/assigned');
  }

  /**
   * show not assigned candidate page
   */
  showNotAssignedCandidates() {
    this.navCtrl.navigateForward('candidate-list/not-assigned');
  }
}
