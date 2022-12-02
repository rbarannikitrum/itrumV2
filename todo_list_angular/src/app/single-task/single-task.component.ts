import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from './../edit-dialog/edit-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from './../task.service';
import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.css']
})
export class SingleTaskComponent {

constructor(public taskService: TaskService, private _snackBar: MatSnackBar, public dialog: MatDialog) {}

@Input() task: string = ''
@Input() id: string = ''
@Input() isCheck: boolean = false

public getTasks (): Subscription {
  return this.taskService.getAllTasks().subscribe(res => {
    this.taskService.allTasks = res
  })
}

public delete(id: string, event: Event): void {
  event.stopPropagation()
  this.taskService.deleteTask(id).subscribe((deleting: any) => {
    this.taskService.allTasks = this.taskService.allTasks.filter(el =>
      el._id !== deleting._id
    )
  })
  this._snackBar.open('Task deleted', 'close', {duration: 5000})
}
public editCheck (event: Event): void {
  event.stopPropagation()
  this.isCheck = !this.isCheck
  this.saveNew(this.task, this.id, this.isCheck)
  this.getTasks()
}
public saveNew (task: string, id: string, isCheck: boolean): void {
  const obj = {
    _id: id,
    text: task,
    isCheck: isCheck
  }
  this.taskService.changeTaskInfo(obj).subscribe(patching =>
     this.taskService.allTasks = this.taskService.allTasks.map(el => {
    if (patching._id === el._id) {
     return patching
    }
    return el
  }))
  this._snackBar.open('Task edited', 'close', {duration: 5000})
}

openDialog() {
  this.dialog.open(EditDialogComponent, {
    data: {
      task: this.task,
      save: this.saveNew,
      id: this.id,
      isCheck: this.isCheck,
      taskService: this.taskService,
      _snackBar: this._snackBar
    },
  });
}
}



