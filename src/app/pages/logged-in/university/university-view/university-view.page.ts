import { Component, OnInit } from '@angular/core';
import {University} from "../../../../models/university";
import {ActivatedRoute} from "@angular/router";
import {LoadingController} from "@ionic/angular";
import {UniversityService} from "../../../../providers/logged-in/university.service";


@Component({
  selector: 'app-university-view',
  templateUrl: './university-view.page.html',
  styleUrls: ['./university-view.page.scss'],
})
export class UniversityViewPage implements OnInit {

  public university: University;
  public university_id;
  constructor(
    public activatedRoute: ActivatedRoute,
    public loadingCtrl: LoadingController,
    public universityService: UniversityService
  ) {
    this.university_id = this.activatedRoute.snapshot.paramMap.get('id');
    const state = window.history.state;
    if (state['model']) {
      this.university = state['model'];
    }
  }

  ngOnInit() {
    if (!this.university) {
      this.loadData();
    }
  }

  async loadData() {
    let loading = await this.loadingCtrl.create();
    loading.present();
    this.universityService.view(this.university_id).subscribe( response => {
      loading.dismiss();
      this.university = response;
    })
  }
}

