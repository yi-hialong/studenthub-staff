import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CandidateInvitationsPageRoutingModule } from './candidate-invitations-routing.module';
import { NoteModule } from 'src/app/components/note/note.module';
import { LoadingModalModule } from 'src/app/components/loading-modal/loading-modal.module';

import { CandidateInvitationsPage } from './candidate-invitations.page';
import { InvitationModule } from 'src/app/components/invitation/invitation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // NoteModule,
    InvitationModule,
    LoadingModalModule,
    CandidateInvitationsPageRoutingModule
  ],
  declarations: [CandidateInvitationsPage]
})
export class CandidateInvitationsPageModule { }
