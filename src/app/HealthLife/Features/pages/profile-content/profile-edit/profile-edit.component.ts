import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import {TranslateModule} from '@ngx-translate/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {AuthenApiService} from '../../../../Access/services/authen-api.service';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    TranslateModule
  ],
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: any | null = null;

  constructor(
      private fb: FormBuilder,
      private authenService: AuthenApiService,
      public dialogRef: MatDialogRef<ProfileEditComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      privacy: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authenService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (err) => {
        console.error('Failed to load user', err);
      },
    });
  }


  onSave(): void {
    if (this.profileForm.valid && this.currentUser) {

      const formattedData = {
        id: this.currentUser.id,
        name: this.profileForm.value.name,
        lastname: this.profileForm.value.lastname,
        email: this.profileForm.value.email,
        password: this.profileForm.value.password,
        created_at: this.currentUser.created_at,
        privacy: this.profileForm.value.privacy
      };

      this.authenService.updateUserStorage(this.currentUser.id, formattedData).subscribe({
        next: (response) => {
          console.log('Update successful', response);
          this.dialogRef.close(formattedData);
        },
        error: (error) => {
          console.error('Update failed', error);
        }
      });
    } else {
      console.error('Form is invalid or currentUser is not set');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
