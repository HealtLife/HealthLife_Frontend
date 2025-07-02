import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';  // Asegúrate de que NgForm esté bien importado
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { AuthenApiService } from '../../../Access/services/authen-api.service';
import { Activities } from '../../models/activities.entity';  // Ajusta la ruta de tu modelo

@Component({
  selector: 'app-activities-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './activities-form.component.html',
  styleUrls: ['./activities-form.component.css']
})
export class ActivitiesFormComponent {
  @Input() activity!: Activities;
  @Input() editMode: boolean = false;
  @Output() activityAddRequested = new EventEmitter<Activities>();
  @Output() activityUpdateRequested = new EventEmitter<Activities>();
  @Output() cancelRequested = new EventEmitter<void>();
  @ViewChild('activityForm', { static: false }) activityForm!: NgForm;

  currentUser: any = null;

  constructor(private authenService: AuthenApiService) {
    this.authenService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });

    this.activity = new Activities({});
    this.activity.userId = this.currentUser.id;
  }

  // Restablece el estado de la edición
  private resetEditState() {
    this.activity = new Activities({});
    this.editMode = false;
    this.activityForm.reset();
  }

  // Método para cancelar la edición o el registro
  protected onCancel() {
    this.cancelRequested.emit();
    this.resetEditState();
  }

  // Validación del formulario
  private isValid = () => this.activityForm.valid;

  // Verifica si está en modo edición
  protected isEditMode = (): boolean => this.editMode;

  // Enviar formulario (agregar o actualizar)
  protected onSubmit() {
    if (this.isValid()) {
      if (this.currentUser) {
        this.activity.userId = this.currentUser.id;
      } else {
        console.error('Usuario no disponible al momento de enviar la actividad');
        return;
      }

      const emitter = this.isEditMode() ? this.activityUpdateRequested : this.activityAddRequested;
      emitter.emit(this.activity);
      this.resetEditState();
    } else {
      console.error('Formulario inválido');
    }
  }
}
