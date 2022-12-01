import { TaskService } from './../task.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  constructor(public taskService: TaskService) {}
}
