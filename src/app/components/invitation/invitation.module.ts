import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { InvitationComponent } from './invitation.component';
 

@NgModule({
    declarations: [InvitationComponent],
    imports: [ 
        CommonModule,
        IonicModule,
        RouterModule,
        PipesModule
    ],
    exports: [InvitationComponent]
})
export class InvitationModule { }