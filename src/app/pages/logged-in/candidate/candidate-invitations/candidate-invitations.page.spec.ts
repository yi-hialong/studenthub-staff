import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CandidateInvitationsPage } from './candidate-invitations.page';

describe('CandidateInvitationsPage', () => {
  let component: CandidateInvitationsPage;
  let fixture: ComponentFixture<CandidateInvitationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateInvitationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CandidateInvitationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
