import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyMallsPageRoutingModule } from './company-malls-routing.module';

import { CompanyMallsPage } from './company-malls.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyMallsPageRoutingModule
  ],
  declarations: [CompanyMallsPage]
})
export class CompanyMallsPageModule {}
