import { TaskService } from './../task.service';
import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ITask } from './taskInterface';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['../../styles.css']
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

}
