import { Component, Input, OnInit } from '@angular/core';

import {Story} from '../../models/request';


@Component({
  selector: 'app-story-item',
  templateUrl: './story-item.component.html',
  styleUrls: ['./story-item.component.scss'],
})
export class StoryItemComponent implements OnInit {

  @Input() story: Story;

  constructor(
  ) {
  }

  ngOnInit() { }

  /**
   * Make date readable by Safari
   * @param date
   */
  toDate(date) {
    if (!date)
      return null;

    if (date) {
      return new Date(date.replace(/-/g, '/'));
    }
  }
}
