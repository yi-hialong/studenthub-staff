import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
//models
import { Invitation } from 'src/app/models/invitation';
//services
import { AwsService } from 'src/app/providers/aws.service';
import { InvitationService } from 'src/app/providers/logged-in/invitation.service';


@Component({
  selector: 'invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss'],
})
export class InvitationComponent implements OnInit {

  @Output() onUpdate: EventEmitter<any> = new EventEmitter();

  @Input() model: Invitation;

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public router: Router,
    public aws: AwsService,
    public invitationService: InvitationService
  ) { }

  ngOnInit() {
  }

  doNothing(event) {
    //event.preventDefault();
    event.stopPropagation();
  }

  openCandidatePage() {
    this.router.navigate(['/candidate-view', this.model.candidate_id]);
  }

  /**
   * Make date readable by Safari
   * @param date
   */
  toDate(date) {
    if (date) {
      return new Date(date.replace(/-/g, '/'));
    }
  }
}
