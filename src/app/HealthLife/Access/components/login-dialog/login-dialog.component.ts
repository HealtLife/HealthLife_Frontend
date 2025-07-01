import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput, MatInputModule } from "@angular/material/input";
import { MatButton, MatButtonModule } from "@angular/material/button";
import { NgIf, CommonModule } from "@angular/common";
import { Router } from "@angular/router";

import { AuthenApiService } from "../../services/authen-api.service";
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormField,
    MatLabel,
    MatDialogContent,
    MatDialogTitle,
    MatInput,
    MatInputModule,
    MatButton,
    MatButtonModule,
    MatDialogClose,
    MatDialogActions,
    NgIf
  ],
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authenService: AuthenApiService,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private dialog: MatDialog,           // ← aquí inyectamos MatDialog
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    if (!this.loginForm.valid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    this.authenService.login(email, password).subscribe(
      user => {
        if (user) {
          this.router.navigate(['/home']);
          this.dialogRef.close();
        } else {
          this.errorMessage = 'Email o contraseña incorrectos';
        }
      },
      error => {
        this.errorMessage = 'Error al iniciar sesión';
      }
    );
  }

  openRegisterDialog(): void {
    // cierro el diálogo de login
    this.dialogRef.close();
    // abro el diálogo de registro
    this.dialog.open(RegisterDialogComponent, {
      autoFocus: true
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
