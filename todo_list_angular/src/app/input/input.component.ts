import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { TaskService } from './../task.service';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  imports: [ MatInputModule, MatButtonModule ]
})

export class InputComponent {

  constructor (private taskService: TaskService, private _snackBar: MatSnackBar) {}

  public addTask (task: string): void {
    this.taskService.createTask(task).subscribe((el) => this.taskService.allTasks.push(el))
    this._snackBar.open('Task added', 'close', {duration: 5000})
  }
  public addTaskOnEnter(event: Event): void {
    this.addTask((event.target as HTMLTextAreaElement).value)
    this._snackBar.open('Task added', 'close', {duration: 5000})
  }
}
