import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Task } from '../../models/task.model';
import { List } from '../../models/list.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public lists: any = [];
  public tasks: any = [];
  public id: string = '';

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.id = params.id;
        this.taskService.getTasks(params.id).subscribe((tasks: any) => {
          this.tasks = tasks;
        });
      }
    });

    this.taskService.getLists().subscribe((response: any) => {
      this.lists = response;
    });
  }

  addTask() {
    this.router.navigate([`lists/${this.id}/new-task`]);
  }

  onTaskClick(task: Task) {
    this.taskService.complete(task).subscribe((res: any) => {
      task.completed = !task.completed;
    });
  }
}
