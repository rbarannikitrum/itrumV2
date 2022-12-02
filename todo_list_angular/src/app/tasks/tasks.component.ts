import { TaskService } from './../task.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  constructor(public taskService: TaskService) {}

  ngOnInit () {
    this.getTasks()
  }
  public getTasks (): Subscription {
    return this.taskService.getAllTasks().subscribe(res => {
      this.taskService.allTasks = res
    })
  }
}

