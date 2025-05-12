import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-edit-goal-dialog',
  standalone: true,
  imports: [
    MatNativeDateModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './edit-goal-dialog.component.html',
  styleUrls: ['./edit-goal-dialog.component.css']
})
export class EditGoalDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditGoalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.data);
  }
}
