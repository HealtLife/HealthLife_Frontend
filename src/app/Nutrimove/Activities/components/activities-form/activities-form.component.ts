import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatCell, MatColumnDef, MatHeaderCell, MatHeaderRow, MatTable} from '@angular/material/table';
import {FormsModule, NgForm} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {ToolbarComponent} from '../../../../public/components/toolbar/toolbar.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatCard, MatCardContent} from '@angular/material/card';
import {RouterOutlet} from '@angular/router';
import {Activities} from '../../models/activities.entity';
import {AuthenApiService} from '../../../Access/services/authen-api.service';

@Component({
  selector: 'app-activities-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatButton,
    ToolbarComponent,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatPaginator,
    MatCard,
    MatCardContent,
    MatColumnDef,
    MatTable,
    RouterOutlet
  ],
  templateUrl: './activities-form.component.html',
  styleUrl: './activities-form.component.css'
})
export class ActivitiesFormComponent {
  //#region Attributes
  @Input() activity!: Activities;
  @Input() editMode: boolean = false;
  @Output() protected activityAddRequested = new EventEmitter<Activities>();
  @Output() protected activityUpdateRequested = new EventEmitter<Activities>();
  @Output() protected cancelRequested = new EventEmitter<void>();
  @ViewChild('activityForm', { static: false }) protected activityForm!: NgForm;
  currentUser: any = null;


  constructor(private authenService: AuthenApiService) {
    this.authenService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;

    });

    this.activity = new Activities({});
    this.activity.userId = this.currentUser.id;

  }

  private resetEditState() {
    this.activity = new Activities({});
    this.editMode = false;
    this.activityForm.reset();
  }

  protected onCancel() {
    this.cancelRequested.emit();
    this.resetEditState();
  }

  private isValid = () => this.activityForm.valid;

  protected isEditMode = (): boolean => this.editMode;

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
      console.error('Invalid form data');
    }
  }

}
