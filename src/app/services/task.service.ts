import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:9000/tasks'; 

  constructor(private http: HttpClient) {}

  getTasks(sort: string, status?: boolean): Observable<Task[]> {
    let url = `${this.apiUrl}?sort=${sort}`;
    if (status !== undefined) {
      url += `&status=${status}`;
    }
    return this.http.get<Task[]>(url);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
