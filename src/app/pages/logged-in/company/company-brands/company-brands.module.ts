import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyBrandsPageRoutingModule } from './company-brands-routing.module';

import { CompanyBrandsPage } from './company-brands.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyBrandsPageRoutingModule
  ],
  declarations: [CompanyBrandsPage]
})
export class CompanyBrandsPageModule {}
