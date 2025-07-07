import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthenApiService } from '../../../Access/services/authen-api.service';
import { Router } from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    NgIf
  ],
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authenService: AuthenApiService,
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    private router: Router
  ) {
    // Inicializamos el formulario de registro con los campos requeridos
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]], // Validez para contraseña
    });
  }

  ngOnInit(): void {
    // Si necesitas realizar alguna inicialización adicional, lo puedes hacer aquí
  }

  // Método que maneja el registro del usuario
  // Método que maneja el registro del usuario
  onRegister(): void {
    if (this.registerForm.valid) {
      const { name, lastname, email, password } = this.registerForm.value;

      // Valores predeterminados de suscripción
      const plan = "Basic Plan";
      const price = 9.99;
      const duration = 12;
      const setTrial = true;

      // Creamos el usuario
      const newUser = {
        name,
        lastname,
        email,
        password,
        privacy: "PRIVATE",
        suscription: "no suscribed"
      };

      this.authenService.register(newUser).subscribe(
        userResponse => {
          console.log('User Created:', userResponse);
          this.errorMessage = 'Usuario creado exitosamente';
          // Ahora preparamos sólo los datos de suscripción
          const subscriptionData = {
            description: plan,
            price: price,
            monthDuration: duration,
            trial: setTrial
          };

          // Llamamos correctamente con dos argumentos:
          // 1) userResponse.id
          // 2) subscriptionData

        },
        err => {
          console.error('Error creating user:', err);
          this.errorMessage = err.error?.message || 'Error registering user';
        }
      );
    }
  }
}
