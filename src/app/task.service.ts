import { Injectable } from '@angular/core';
import { Task } from './models/task.model';
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

  getLists() {
    return this.webService.get('lists');
  }

  getTasks(listId: string) {
    return this.webService.get(`lists/${listId}/tasks`);
  }

  createTask(listId: string, title: string) {
    return this.webService.post(`lists/${listId}/tasks`, { title });
  }

  complete(task: Task) {
    return this.webService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed,
    });
  }
}
