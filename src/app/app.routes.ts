import { Routes } from '@angular/router';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';

export const routes: Routes = [ 
    { path: 'tasks', component: TaskListComponent },
    { path: 'task-form', component: TaskFormComponent },
    { path: '', redirectTo: '/tasks', pathMatch: 'full' }];
