import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'lodash';
import { groupBy, mergeMap, Observable, tap, toArray } from 'rxjs';
import { ITask } from './input/taskInterface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  allTasks: Array<ITask> = []

  constructor(private http: HttpClient) { }

  public getAllTasks (): Observable<Array<ITask>> {
    return this.http.get<Array<ITask>>('http://localhost:8000/allTasks').pipe(
      tap((result: Array<ITask>) => {
        result.sort((a: ITask, b: ITask) => {return a.isCheck > b.isCheck ? 1 : -1})
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
