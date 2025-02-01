import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TableModule, CheckboxModule, ButtonModule, FormsModule, ConfirmDialogModule, DropdownModule, TaskFormComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  providers: [ConfirmationService, MessageService]  
})
export class TaskListComponent implements OnInit {
  @ViewChild('dt') dt: any; 

  @ViewChild(TaskFormComponent) taskForm!: TaskFormComponent;

  tasks: Task[] = [];

 
  statusOptions = [
    { label: 'Tous', value: null },
    { label: 'Complété', value: true },
    { label: 'En cours', value: false }
  ];

  constructor(
    private taskService: TaskService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(sort = 'desc') {
    this.taskService.getTasks(sort).subscribe(data => this.tasks = data);
  }

  toggleStatus(task: Task) {
    task.status = !task.status;
    this.taskService.updateTask(task.id!, task).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Statut mis à jour' });
    });
  }

  confirmDelete(task: Task) {
    this.confirmationService.confirm({
      message: 'Voulez-vous supprimer cette tâche?',
      accept: () => {
        this.taskService.deleteTask(task.id!).subscribe(() => {
          this.tasks = this.tasks.filter(t => t.id !== task.id);
          this.messageService.add({ severity: 'success', summary: 'Supprimé', detail: 'Tâche supprimée' });
        });
      }
    });
  }

  
  filterTasks(event: any, field: string, matchMode: string) {
    const value = event.target ? event.target.value : event.value;
    this.dt.filter(value, field, matchMode);
  }

  editTask(task: Task) {
    this.taskForm.openDialog(task);
  }
}
