import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ITask } from './input/taskInterface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  allTasks: Array<ITask> = []
  completed: number = 0
  uncompleted: number = 0
  loadStatus: boolean = false
  url: string = 'http://localhost:8000/task'

  constructor(private http: HttpClient) { }

  public getAllTasks (): Observable<Array<ITask>> {
    const url = 'http://localhost:8000/allTasks'
    this.loadStatus = true
     return this.http.get<Array<ITask>>(url).pipe(
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
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post<ITask>(this.url, obj, {headers: headers})
  }

  public deleteTask(id: string): Observable<ITask> {
    const httpParams = new HttpParams().set('id', id)
    const options = {params: httpParams}
    return this.http.delete<ITask>(this.url, options)
  }

  public changeTaskInfo(obj: ITask): Observable<ITask> {
    return this.http.patch<ITask>(this.url, obj)
  }
}
