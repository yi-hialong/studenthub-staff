import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpiredIdPageRoutingModule } from './expired-id-routing.module';

import { ExpiredIdPage } from './expired-id.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpiredIdPageRoutingModule
  ],
  declarations: [ExpiredIdPage]
})
export class ExpiredIdPageModule {}
