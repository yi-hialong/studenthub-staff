import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CandidateFormPageRoutingModule } from './candidate-form-routing.module';

import { CandidateFormPage } from './candidate-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CandidateFormPageRoutingModule
  ],
  declarations: [CandidateFormPage]
})
export class CandidateFormPageModule {}
