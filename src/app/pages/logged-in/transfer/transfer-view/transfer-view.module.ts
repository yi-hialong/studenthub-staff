import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferViewPageRoutingModule } from './transfer-view-routing.module';

import { TransferViewPage } from './transfer-view.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { LoadingModalModule } from "../../../../components/loading-modal/loading-modal.module";
import { ContractModule } from 'src/app/components/contract/contract.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TransferViewPageRoutingModule,
        PipesModule,
        ContractModule,
        TranslateModule.forChild(),
        LoadingModalModule
    ],
    exports: [
        PipesModule
    ],
    declarations: [TransferViewPage]
})
export class TransferViewPageModule { }
