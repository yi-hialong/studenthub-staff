import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-brand-option',
  templateUrl: './brand-option.page.html',
  styleUrls: ['./brand-option.page.scss'],
})
export class BrandOptionPage implements OnInit {

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
  }

  action(action) {
    this.popoverCtrl.dismiss({ action: action });
  }
}
