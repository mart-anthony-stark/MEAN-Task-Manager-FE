import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss'],
})
export class NewListComponent implements OnInit {
  constructor(private taskService: TaskService, private route: Router) {}

  ngOnInit(): void {}

  createNewList(title: String) {
    this.taskService.createList(title).subscribe((response: any) => {
      this.route.navigate([`/lists/${response._id}`]);
    });
  }
}
