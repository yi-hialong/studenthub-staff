import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CandidateWarningListPageRoutingModule } from './candidate-warning-list-routing.module';

import { CandidateWarningsPage } from './candidate-warning-list.page';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoadingModalModule,
    IonicModule,
    CandidateWarningListPageRoutingModule
  ],
  declarations: [CandidateWarningsPage]
})
export class CandidateWarningListPageModule {}
