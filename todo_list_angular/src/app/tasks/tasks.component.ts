import { TaskService } from './../task.service';
import { Component, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { ITask } from '../input/taskInterface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(public taskService: TaskService) {}

  filterMore5: boolean = false

  ngOnInit () {
    this.getTasks()
  }
  public getTasks (): Subscription {
    return this.taskService.getAllTasks()
    .subscribe(res => {
      this.taskService.allTasks = res
    }
    )
  }
  drop(event: CdkDragDrop<ITask[]>) {
    moveItemInArray(this.taskService.allTasks, event.previousIndex, event.currentIndex);
  }

}

