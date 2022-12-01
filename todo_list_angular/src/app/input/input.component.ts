import { TaskService } from './../task.service';
import { Component, OnInit } from '@angular/core';
import { ITask } from './taskInterface';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent  implements OnInit {


  constructor (private taskService: TaskService) {

  }
  ngOnInit () {
    this.getTasks()
  }
  getTasks () {
    this.taskService.getAllTasks().subscribe(res => this.taskService.allTasks = res)
  }
  addTask (task: string) {
    this.taskService.createTask(task).subscribe((el) => this.taskService.allTasks.push(el as ITask))
  }
  addTaskOnEnter(event: Event) {
    this.addTask((event.target as HTMLTextAreaElement).value)
  }

}
