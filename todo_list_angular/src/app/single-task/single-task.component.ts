import { TaskService } from './../task.service';
import { Component, Input } from '@angular/core';
import { ITask } from '../input/taskInterface';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.css']
})
export class SingleTaskComponent {

constructor(public taskService: TaskService) {

}

edit: boolean = false
@Input() task: string = ''
@Input() id: string = ''
@Input() isCheck: boolean = false
public delete(id: string) {
  this.taskService.deleteTask(id).subscribe((deleting: any) => {
    this.taskService.allTasks = this.taskService.allTasks.filter(el =>
      el._id !== deleting._id
    )
  })
}
public editCheck () {
  this.isCheck = !this.isCheck
  this.saveNew(this.task, this.id, this.isCheck)
}
public saveNew (task: string, id: string, isCheck: boolean) {
  const obj = {
    _id: id,
    text: task,
    isCheck: isCheck
  }
  this.taskService.changeTaskInfo(obj).subscribe(patching => this.taskService.allTasks = this.taskService.allTasks.map(el => {
    if (patching._id === el._id) {
     return patching
    }
    return el
  }))
  this.edit = false
}
}



