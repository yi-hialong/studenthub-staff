import { Component, Input, OnInit } from '@angular/core';

import {Request, Story} from '../../models/request';


@Component({
  selector: 'app-story-item',
  templateUrl: './story-item.component.html',
  styleUrls: ['./story-item.component.scss'],
})
export class StoryItemComponent implements OnInit {

  @Input() request: Request;

  @Input() story: Story;

  constructor(
  ) {
  }

  ngOnInit() { 
    if(!this.request && this.story.request) {
      this.request = this.story.request;
    }
  }

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
