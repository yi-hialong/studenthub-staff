import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {Note} from '../../models/note';
import {AuthHttpService} from './authhttp.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private noteEndpoint = '/notes';

  constructor(private authHttp: AuthHttpService) { }

  /**
   * List of all Notes
   * @returns {Observable<any>}
   */
  listByStaff(page: number, staffID: number): Observable<any>{
    return this.authHttp.getRaw(this.noteEndpoint + '/staff/' + staffID + '?expand=company&page=' + page);
  }

  /**
   * create note
   * @param model
   */
  create(model: Note): Observable<any>{
    return this.authHttp.post(this.noteEndpoint, {
      candidate_id: (model.candidate_id) ? model.candidate_id : null,
      company_id: (model.company_id) ? model.company_id : null,
      request_uuid: (model.request_uuid) ? model.request_uuid : null,
      contact_uuid: (model.contact_uuid) ? model.contact_uuid : null,
      fulltimer_uuid: (model.fulltimer_uuid) ? model.fulltimer_uuid : null,
      note: model.note_text,
      type: model.note_type
    });
  }

  /**
   * update note
   * @param model
   */
  update(model: Note): Observable<any>{
    return this.authHttp.patch(`${this.noteEndpoint}/${model.note_uuid}`, {
      note: model.note_text,
      type: model.note_type,
      company_id: (model.company_id) ? model.company_id : null,
      request_uuid: (model.request_uuid) ? model.request_uuid : null,
      contact_uuid: (model.contact_uuid) ? model.contact_uuid : null,
      fulltimer_uuid: (model.fulltimer_uuid) ? model.fulltimer_uuid : null,
    });
  }

  /**
   * delete note
   * @param model
   */
  delete(model: Note): Observable<any>{
    return this.authHttp.delete(`${this.noteEndpoint}/${model.note_uuid}`);
  }

  /**
   * list candidate note
   */
  list(): Observable<any>{
    const url = `${this.noteEndpoint}?expand=createdBy,updatedBy,company,request`;
    return this.authHttp.getRaw(url);
  }

  /**
   * list candidate note
   */
  listByTypeAndId(type: string, id, page): Observable<any>{
    return this.authHttp.getRaw(`${this.noteEndpoint}/${type}/${id}?expand=createdBy,updatedBy,company,request&page=${page}`);
  }

  /**
   * toggle committed
   * @param model
   */
  toggleCommitted(model: Note): Observable<any>{
    const url = `${this.noteEndpoint}/toggle-committed`;
    return this.authHttp.patch(url, {
      candidate_id: model.candidate_id,
      note: model.note_text,
      type: model.note_type
    });
  }
  /**
   * list candidate note by id
   */
  listById(id: number): Observable<any>{
    const url = `${this.noteEndpoint}/list-by-id/${id}?expand=createdBy,updatedBy,company,request`;
    return this.authHttp.getRaw(url);
  }
}
