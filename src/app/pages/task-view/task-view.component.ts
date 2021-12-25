import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  public lists: [{ title: String; _id: String }] = [{ title: '', _id: '' }];

  ngOnInit(): void {
    this.getLists();
  }

  createNewList() {
    this.taskService.createList('List').subscribe((response: any) => {
      this.getLists();
    });
  }

  getLists() {
    this.taskService.getLists().subscribe((response: any) => {
      this.lists = response;
    });
  }
}
