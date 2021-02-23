import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
// models
import { Invitation } from 'src/app/models/invitation';
import { EventService } from 'src/app/providers/event.service';
import { CandidateService } from 'src/app/providers/logged-in/candidate.service';
// services
import { InvitationService } from 'src/app/providers/logged-in/invitation.service';


@Component({
  selector: 'app-candidate-invitations',
  templateUrl: './candidate-invitations.page.html',
  styleUrls: ['./candidate-invitations.page.scss'],
})
export class CandidateInvitationsPage implements OnInit {

  public borderLimit;
  
  public loading = false;

  public candidate_id;
  
  public status; // 1:Invited, 2:Rejected, 3:Accepted
  
  public candidate;
  
  public invitations: Invitation[] = [];

  constructor(
    public modalCtrl: ModalController,
    public activatedRoute: ActivatedRoute,
    public eventService: EventService,
    public candidateService: CandidateService,
    public invitationService: InvitationService
  ) {
  }

  ngOnInit() {

    if (!this.candidate_id) {
      this.candidate_id = this.activatedRoute.snapshot.paramMap.get('candidate_id');
    }

    if (!this.status) {
      this.status = this.activatedRoute.snapshot.paramMap.get('status');
    }

    const state = window.history.state;

    if (state && state.candidate) {
      this.candidate = state.candidate;
    }

    if (!this.candidate) {
      this.loadCandidateDetail();
    }

    this.eventService.reloadCandiate$.subscribe((res) => {
      this.loadCandidateDetail();
    });

    this.eventService.invitationUpdated$.subscribe((data: any) => {
      if (data.candidate_id == this.candidate_id) {
        this.loadInvitations();
      }
    });

    this.loadInvitations();
  }

  loadCandidateDetail(loading = true) {
    this.loading = loading;
    this.candidateService.detail(this.candidate_id).subscribe(response => {
      this.loading = false;
      this.candidate = response;
    });
  }

  /**
   * load candidate invitations without pagination
   */
  loadInvitations() {
    this.invitationService
      .list('&candidate_id=' + this.candidate_id + '&status=' + this.status)
      .subscribe(async jsonResponse => {
        this.invitations = jsonResponse;
      });
  }

  logScrolling(e) {
    this.borderLimit = (e.detail.scrollTop > 20);
  }
}
