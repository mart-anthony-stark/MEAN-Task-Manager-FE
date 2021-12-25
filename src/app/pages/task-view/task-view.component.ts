import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  public lists: any = [];
  public tasks: any = [];
  public id: String = '';

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.id = params.id;

      this.taskService.getTasks(params.id).subscribe((tasks: any) => {
        this.tasks = tasks;
      });
    });

    this.taskService.getLists().subscribe((response: any) => {
      this.lists = response;
    });
  }
}
