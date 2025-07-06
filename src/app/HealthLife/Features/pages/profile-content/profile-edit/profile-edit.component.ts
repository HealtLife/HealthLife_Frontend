import { Component, Inject, OnInit }            from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA }         from '@angular/material/dialog';
import { ProfileApiService, Profile }          from '../services/ProfileApi.service';
import {MatButton} from '@angular/material/button';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIcon, MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  standalone: true,
  imports: [
    MatButton,
    MatRadioGroup,
    MatRadioButton,
    ReactiveFormsModule,
    MatInput,
    MatLabel,
    MatFormField,
    MatCardActions,
    MatIcon,
    MatIconModule,
    MatCardContent,
    MatCardTitle,
    MatCard,
    MatCardHeader
  ],
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  profileForm!: FormGroup;
  private userId!: number;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProfileEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: Profile },
    private profileApi: ProfileApiService
  ) {}

  ngOnInit(): void {
    const user = this.data.user;
    this.userId = user.id;
    this.profileForm = this.fb.group({
      name:     [user.name,     Validators.required],
      lastname: [user.lastname, Validators.required],
      email:    [user.email,    [Validators.required, Validators.email]],
      password: ['',            Validators.minLength(6)],
      privacy:  [user.privacy,  Validators.required]
    });
  }

  onSave(): void {
    if (this.profileForm.invalid) return;

    const changes: Partial<Profile> = {
      name:     this.profileForm.value.name,
      lastname: this.profileForm.value.lastname,
      email:    this.profileForm.value.email,
      privacy:  this.profileForm.value.privacy
    };

    const pwd = this.profileForm.value.password;
    if (pwd) { changes.password = pwd; }

    this.profileApi.updateUser(this.userId, changes).subscribe(
      (updated: Profile) => {
        // callback de éxito
        this.dialogRef.close(updated);
      },
      () => {
        // callback de error
        this.dialogRef.close();
      }
    );
  }


  onCancel(): void {
    this.dialogRef.close();
  }
}
