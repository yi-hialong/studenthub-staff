import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss'],
})
export class ContactFilterComponent implements OnInit {
      
    public borderLimit = false;
    
    public filter = {
      filter_email_unverified: null
    };
  
    constructor(
      public modalCtrl: ModalController
    ) {
    }
  
    ngOnInit() {
    }
  
    filterByEmailStatus($event, requestStatus) {
      this.filter.filter_email_unverified = requestStatus;
    } 

    submit() {
      this.modalCtrl.dismiss(this.filter);
    }
  
    reset() {
      this.filter = {
        filter_email_unverified: null, 
      };
    }
   
    logScrolling(e) {
      this.borderLimit = (e.detail.scrollTop > 20);
    }
  }
  