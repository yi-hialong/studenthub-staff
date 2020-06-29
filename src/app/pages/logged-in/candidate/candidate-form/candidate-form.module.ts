import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CandidateFormPageRoutingModule } from './candidate-form-routing.module';

import { CandidateFormPage } from './candidate-form.page';
import {ImageUploadComponent} from "../../../../components/image-upload/image-upload.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CandidateFormPageRoutingModule
  ],
  declarations: [CandidateFormPage, ImageUploadComponent]
})
export class CandidateFormPageModule {}
