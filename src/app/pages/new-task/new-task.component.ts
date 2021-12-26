import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  id: any;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (params['id'] === 'undefined') router.navigate(['lists']);
    });
  }

  ngOnInit(): void {}

  createTask(title: string) {
    this.taskService.createTask(this.id, title).subscribe((task: any) => {
      this.router.navigate([`lists/${this.id}`]);
    });
  }
}
