// src/app/HealthLife/Features/pages/profile-content/profile-view/profile-view.component.ts

import { Component, OnInit }                   from '@angular/core';
import { Router }                              from '@angular/router';
import { MatSnackBar }                         from '@angular/material/snack-bar';
import { MatDialog }                           from '@angular/material/dialog';
import { CommonModule }                        from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule }                       from '@angular/material/card';
import { MatButtonModule }                     from '@angular/material/button';
import { MatFormFieldModule }                  from '@angular/material/form-field';
import { MatInputModule }                      from '@angular/material/input';
import { MatRadioModule }                      from '@angular/material/radio';
import { MatIconModule }                       from '@angular/material/icon';

import { ProfileApiService, Profile }          from '../services/ProfileApi.service';
import { AuthenApiService }                    from '../../../../Access/services/authen-api.service';
import { ProfileEditComponent }                from '../profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule
  ],
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  currentUser!: Profile;
  subscription: any = null;       // ← Declaramos aquí
  editMode = false;
  form!: FormGroup;

  constructor(
    private profileApi: ProfileApiService,
    private authService: AuthenApiService,   // para getSubscription
    private fb: FormBuilder,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(localStorage.getItem('userId'));
    if (!id) {
      console.error('No userId en localStorage');
      return;
    }

    // 1) Cargar perfil
    this.profileApi.getUserById(id).subscribe(user => {
      this.currentUser = user;
      this.buildForm(user);

      // 2) Cargar suscripción
      this.authService.getSubscription(user.id).subscribe(sub => {
        this.subscription = sub;
      }, err => console.error('Error al obtener suscripción', err));
    }, err => console.error('Error al obtener perfil', err));
  }

  private buildForm(user: Profile) {
    this.form = this.fb.group({
      name:     [user.name,     Validators.required],
      lastname: [user.lastname, Validators.required],
      email:    [user.email,    [Validators.required, Validators.email]],
      privacy:  [user.privacy,  Validators.required]
    });
  }

  onEdit(): void {
    const dialogRef = this.dialog.open(ProfileEditComponent, {
      width: '480px',
      data: { user: this.currentUser }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Actualizamos la vista con los datos editados
        this.currentUser = result;
        this.snack.open('Perfil actualizado', 'Cerrar', { duration: 2000 });
      }
    });
  }

  onCancel(): void {
    this.editMode = false;
    this.buildForm(this.currentUser);
  }

  onSave(): void {
    if (this.form.invalid) return;
    const updated: Partial<Profile> = this.form.value;
    this.profileApi.updateUser(this.currentUser.id, updated)
      .subscribe(user => {
        this.currentUser = user;
        this.editMode = false;
        this.snack.open('Perfil actualizado', 'Cerrar', { duration: 2000 });
      }, () => {
        this.snack.open('Error al actualizar perfil', 'Cerrar', { duration: 2000 });
      });
  }

  onUpgrade(): void {
    this.router.navigate(['/profile/payment']);
  }

}
