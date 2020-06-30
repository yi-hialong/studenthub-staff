import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerateIdPageRoutingModule } from './generate-id-routing.module';

import { GenerateIdPage } from './generate-id.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    GenerateIdPageRoutingModule
  ],
  declarations: [GenerateIdPage]
})
export class GenerateIdPageModule {}
