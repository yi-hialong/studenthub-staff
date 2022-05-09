import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionComponent implements OnInit {

  public actions = [];

  constructor(
    public popoverCtrl: PopoverController
  ) { }

  ngOnInit() {}

  onSelected(action) {
    this.popoverCtrl.dismiss({ 
      action: action
    });
  }
}
