import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrandOptionPageRoutingModule } from './brand-option-routing.module';

import { BrandOptionPage } from './brand-option.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrandOptionPageRoutingModule
  ],
  declarations: [BrandOptionPage]
})
export class BrandOptionPageModule {}
