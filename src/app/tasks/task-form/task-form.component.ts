import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, DialogModule, CheckboxModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  display = false;
  @Input() task: Task = { name: '', status: false, createdAt: new Date() };

  constructor(private taskService: TaskService) {}

  openDialog(task?: Task) {
    this.task = task ? { ...task } : { name: '', status: false, createdAt: new Date() };
    this.display = true;
    console.log('Display is now', this.display); 
  }

  saveTask() {
    if (this.task.id) {
      this.taskService.updateTask(this.task.id, this.task).subscribe();
    } else {
      this.taskService.addTask(this.task).subscribe();
    }
    this.display = false;
  }
}