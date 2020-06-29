import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {AlertController, LoadingController, ModalController, NavController, ToastController} from "@ionic/angular";
import {StoreService} from "src/app/providers/logged-in/store.service";
import {Store} from "src/app/models/store";

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.page.html',
  styleUrls: ['./store-list.page.scss'],
})
export class StoreListPage implements OnInit {

  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public stores: Store[];

  private _companyId;

  constructor(
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public storeService: StoreService,
    private _modalCtrl: ModalController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
  ) {
    this._companyId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.loadData(this.currentPage);
  }

  /**
   * current page link
   * @param page
   */
  pageLinkColor(page: number) {

    if(page == this.currentPage)
      return 'light';

    return '';
  }

  /**
   * load store list
   * @param page
   */
  async loadData(page: number) {
    // Load list of ALL stores
    let loader = await this._loadingCtrl.create();
    loader.present();
    this.storeService.getStoresBelongingToCompany(this._companyId).subscribe(response => {

        this.pageCount = response.headers.get('X-Pagination-Page-Count');
        this.currentPage = response.headers.get('X-Pagination-Current-Page');

        this.pages = [];

        for(var i = 1; i <= this.pageCount; i++){
          this.pages.push(i);
        }

        //hide if no page = 1

        if(this.pageCount == 1)
          this.pages = [];

        this.stores = response.body;
      },
      error => {},
      () => {loader.dismiss();}
    );
  }

  /**
   * When its selected
   */
  rowSelected(model){
    // Load Detail Page
    this.navCtrl.navigateForward('store-view/'+model.store_id, {
      state : {
        model: model
      }
    });
  }

  /**
   * Loads the create page
   */
  create(){
    let store = new Store();
    store.company_id = this._companyId;

    // let modal = this._modalCtrl.create(StoreFormPage, {
    //   model: store,
    // });
    // // Refresh List if required
    // modal.onDidDismiss(data => {
    //   if(data){
    //     if(data.refresh){
    //       this.loadData(this.currentPage);
    //     }
    //   }
    // });
    // modal.present();
  }

  /**
   * Delete the provided model
   */
  async delete(store: Store){
    let loader = await this._loadingCtrl.create();
    loader.present();
    let confirm = await this._alertCtrl.create({
      header: 'Delete Store?',
      message: 'Are you sure you want to delete this Store?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.storeService.delete(store).subscribe(async jsonResp => {
              loader.dismiss();

              if (jsonResp.operation == 'error') {
                let alert = await this._alertCtrl.create({
                  header: 'Deletion Error!',
                  subHeader: jsonResp.message,
                  buttons: ['OK']
                });
                alert.present();
              }

              if (jsonResp.operation == 'success') {
                let toast = await this._toastCtrl.create({
                  message: jsonResp.message,
                  duration: 3000
                });
                toast.present();
              }
              this.loadData(this.currentPage);
            });
          }
        },
        {
          text: 'No',
          handler: () => {
            this.loadData(this.currentPage);
            loader.dismiss();
          }
        }
      ]
    });
    confirm.present();
  }
}

