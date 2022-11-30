
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
newArr: any = []

  delete(id: string) {

    this.taskService.deleteTask(id).subscribe((deleting: any) => {
      this.taskService.allTasks = this.taskService.allTasks.filter  (el =>
        el._id !== deleting._id
      )
      return this.newArr

    })

  }
}
