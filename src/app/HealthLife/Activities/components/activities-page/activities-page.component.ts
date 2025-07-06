import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient }                    from '@angular/common/http';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ActivitiesFormComponent }       from '../activities-form/activities-form.component';
import {MatCard, MatCardModule} from '@angular/material/card';
import {MatButton, MatButtonModule, MatIconButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableModule
} from '@angular/material/table';
import {MatIcon, MatIconModule} from '@angular/material/icon';

import {ActivitiesService, ActivityDto} from '../../services/activities.service';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInput, MatInputModule} from '@angular/material/input';
import {CommonModule, NgIf} from '@angular/common';

interface Activity {
  id: number;
  name: string;
  description: string;
  duration: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-activities-page',
  templateUrl: './activities-page.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSnackBarModule,
    MatDialogModule,
    ActivitiesFormComponent,
    MatCard,
    MatButton,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatColumnDef,
    MatIcon,
    MatIconModule,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatIconButton,
    MatFormField,
    MatLabel,
    FormsModule,
    MatInput,
    NgIf
  ],
  styleUrls: ['./activities-page.component.css']
})
export class ActivitiesPageComponent implements OnInit {
  activities: ActivityDto[] = [];
  searchTerm: any;

  constructor(
    private activitiesSvc: ActivitiesService,
    private snack: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.activitiesSvc.getAll().subscribe(
      activities => this.activities = activities,
      err        => console.error('Error al obtener actividades', err)
    );
  }

  delete(id: number): void {
    this.activitiesSvc.delete(id).subscribe(
      () => {
        this.snack.open('Actividad eliminada', 'Cerrar', { duration: 2000 });
        this.loadAll();
      },
      err => console.error('Error al eliminar actividad', err)
    );
  }

  search(): void {
    const term = this.searchTerm.trim();
    if (term) {
      this.activitiesSvc.searchByName(term).subscribe(
        list => this.activities = list,
        err  => console.error('Error en búsqueda', err)
      );
    } else {
      this.loadAll();
    }
  }

  clear(): void {
    this.searchTerm = '';
    this.loadAll();
  }

  openForm(): void {
    const ref = this.dialog.open(ActivitiesFormComponent, { width: '400px' });
    ref.componentInstance.created.subscribe(() => {
      ref.close();
      this.loadAll();
    });
  }
}

