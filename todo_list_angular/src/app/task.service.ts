import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { from, Observable, Subject, switchMap, tap } from 'rxjs';
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

  public createTask(obj : ITask) {
   return this.http.post('http://localhost:8000/task', obj, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })})
  }
}
