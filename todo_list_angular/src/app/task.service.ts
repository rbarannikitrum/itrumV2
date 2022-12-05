import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { groupBy, mergeMap, Observable, tap, toArray } from 'rxjs';
import { ITask } from './input/taskInterface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  allTasks: Array<ITask> = []
  completed: number = 0
  uncompleted: number = 0
  loadStatus: boolean = false

  constructor(private http: HttpClient) { }

  public getAllTasks (): Observable<Array<ITask>> {
    this.loadStatus = true
     return this.http.get<Array<ITask>>('http://localhost:8000/allTasks').pipe(
      tap((result: Array<ITask>) => {
        result.sort((a: ITask, b: ITask) => {return a.isCheck > b.isCheck ? 1 : -1})
        this.completed = result.filter(el => el.isCheck === true).length
        this.uncompleted = result.length - this.completed
        this.loadStatus = false
      })
    )
  }

  public createTask(task: string): Observable<ITask> {
    const obj = {
      text: task,
      isCheck: false
    }
    return this.http.post<ITask>('http://localhost:8000/task', obj, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })})
  }

  public deleteTask(id: string): Observable<ITask> {
    return this.http.delete<ITask>(`http://localhost:8000/task/?id=${id}`)
  }
  public changeTaskInfo(obj: ITask): Observable<ITask> {
    return this.http.patch<ITask>('http://localhost:8000/task', obj)
  }
}
