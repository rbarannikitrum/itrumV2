
import { TaskService } from './../task.service';
import { Component, OnInit } from '@angular/core';
import { ITask } from '../input/taskInterface';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  constructor(public taskService: TaskService) {
  }

edit: boolean = false

}
