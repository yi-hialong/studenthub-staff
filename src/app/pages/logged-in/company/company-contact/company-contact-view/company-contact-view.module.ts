import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyContactViewPageRoutingModule } from './company-contact-view-routing.module';

import { CompanyContactViewPage } from './company-contact-view.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { NoteModule } from 'src/app/components/note/note.module';
import { RequestListingComponent } from 'src/app/components/request-listing/request-listing.component';
import { RequestListingModule } from 'src/app/components/request-listing/request-listing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PipesModule, 
    LoadingModalModule,
    NoteModule,
    RequestListingModule,
    CompanyContactViewPageRoutingModule
  ],
  declarations: [CompanyContactViewPage]
})
export class CompanyContactViewPageModule { }
