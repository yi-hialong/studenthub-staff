import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyDocumentsPageRoutingModule } from './company-documents-routing.module';

import { CompanyDocumentsPage } from './company-documents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyDocumentsPageRoutingModule
  ],
  declarations: [CompanyDocumentsPage]
})
export class CompanyDocumentsPageModule {}
