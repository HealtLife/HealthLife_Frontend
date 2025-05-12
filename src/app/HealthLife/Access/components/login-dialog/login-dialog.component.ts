import { Component } from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenApiService} from "../../services/authen-api.service";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    MatDialogContent,
    MatDialogTitle,
    MatInput,
    MatInputModule,
    MatButton,
    MatButtonModule,
    MatDialogModule,
    MatDialogClose,
    MatDialogActions,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.css'
})
export class LoginDialogComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;


  constructor(
    private fb: FormBuilder,
    private authenService: AuthenApiService,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authenService.login(email, password).subscribe(
        (user) => {
          if (user){
            this.router.navigate(['/home']);
            this.dialogRef.close();
          }else{
            this.errorMessage = 'wrong Email or password ';
            console.error('Failed authentication');
          }



        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
