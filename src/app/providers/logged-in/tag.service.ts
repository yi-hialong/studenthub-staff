import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
// services
import {AuthHttpService} from './authhttp.service';


@Injectable({
  providedIn: 'root'
})
export class TagService {

  private storyEndpoint = '/tags';

  constructor(private _authhttp: AuthHttpService) { }

  /**
   * Return list of all tags
   * @returns {Observable<any>}
   */
  list(): Observable<any>{
    const url = this.storyEndpoint + '/list';
    return this._authhttp.get(url);
  }
}

  