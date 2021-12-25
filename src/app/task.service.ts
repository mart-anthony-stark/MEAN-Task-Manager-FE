import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private webService: WebRequestService) {}

  createList(title: String) {
    // send web request
    return this.webService.post('lists', { title });
  }

  getLists(){
    return this.webService.get('lists')
  }
}
