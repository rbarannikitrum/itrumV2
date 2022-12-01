import { TaskService } from './../task.service';
import { Component, OnInit } from '@angular/core';
import { ITask } from './taskInterface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent  implements OnInit {

  constructor (private taskService: TaskService, private _snackBar: MatSnackBar) {}

  ngOnInit () {
    this.getTasks()
  }
  public getTasks (): Subscription {
    return this.taskService.getAllTasks().subscribe(res => this.taskService.allTasks = res)
  }
  public addTask (task: string): void {
    this.taskService.createTask(task).subscribe((el) => this.taskService.allTasks.push(el))
    this._snackBar.open('Task added', 'close', {duration: 5000})
  }
  public addTaskOnEnter(event: Event): void {
    this.addTask((event.target as HTMLTextAreaElement).value)
    this._snackBar.open('Task added', 'close', {duration: 5000})
  }
}
