import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { from, map, Observable, Subject, switchMap, tap } from 'rxjs';
import { ITask } from './input/taskInterface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  allTasks: Array<ITask> = []

  constructor(private http: HttpClient) { }



  public getAllTasks (): Observable<Array<ITask>> {
    return this.http.get<Array<ITask>>('http://localhost:8000/allTasks')
  }

  public createTask(task: string): Observable<ITask> {
    const obj = {
      text: task,
      isCheck: false
    }
   return this.http.post<ITask>('http://localhost:8000/task', obj, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })})
  }
  public deleteTask(id: string) {
    return this.http.delete(`http://localhost:8000/task/?id=${id}`)
  }
}
