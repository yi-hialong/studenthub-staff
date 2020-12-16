import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferChartPageRoutingModule } from './transfer-chart-routing.module';

import { TransferChartPage } from './transfer-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferChartPageRoutingModule
  ],
  declarations: [TransferChartPage]
})
export class TransferChartPageModule {}
