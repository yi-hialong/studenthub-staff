import {Component, Input, OnInit} from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import {Request} from '../../models/request';

@Component({
  selector: 'request-listing',
  templateUrl: './request-listing.component.html',
  styleUrls: ['./request-listing.component.scss'],
})
export class RequestListingComponent implements OnInit {

  @Input() request: Request;
  @Input() showStatus = true;

  constructor(
    public authService: AuthService
  ) {
  }

  ngOnInit() {
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
