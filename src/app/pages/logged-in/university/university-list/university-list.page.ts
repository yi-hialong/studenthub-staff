import { Component, OnInit } from '@angular/core';
import {LoadingController, NavController} from "@ionic/angular";
import {UniversityService} from "src/app/providers/logged-in/university.service";
import {University} from "src/app/models/university";

@Component({
  selector: 'app-university-list',
  templateUrl: './university-list.page.html',
  styleUrls: ['./university-list.page.scss'],
})
export class UniversityListPage implements OnInit {

  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public universities: University[];

  constructor(
    public navCtrl: NavController,
    public universityService: UniversityService,
    private _loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {
    this.loadData(this.currentPage);
  }


  /**
   * load university data
   * @param page
   */
  async loadData(page: number) {
    // Load list of university
    let loader = await this._loadingCtrl.create();
    loader.present();
    this.universityService.list(page).subscribe(response => {

        this.pageCount = response.headers.get('X-Pagination-Page-Count');
        this.currentPage = response.headers.get('X-Pagination-Current-Page');

        this.pages = [];

        for(var i = 1; i <= this.pageCount; i++){
          this.pages.push(i);
        }

        //hide if no page = 1

        if(this.pageCount == 1)
          this.pages = [];

        this.universities = response.body;

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
    this.navCtrl.navigateForward('university-view/'+model.university_id, {
      state :{
        model: model
      }
    });
  }
}
