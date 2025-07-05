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
  onRegister(): void {
    if (this.registerForm.valid) {
      const { name, lastname, email, password } = this.registerForm.value;

      // Definir valores predeterminados para los campos
      const plan = "Basic Plan"; // Ejemplo de valor predeterminado
      const price = 9.99; // Ejemplo de precio
      const duration = 12; // Ejemplo de duración en meses
      const setTrial = true; // Ejemplo de si es una suscripción de prueba

      // Creamos el objeto newUser con la suscripción como "no suscribed" por defecto
      const newUser = {
        name,
        lastname,
        email,
        password,
        privacy: "PRIVATE", // Asegúrate de incluir todos los campos requeridos por tu backend
        suscription: "no suscribed" // Valor por defecto para suscripción
      };

      // Llamamos al servicio para registrar el usuario
      this.authenService.register(newUser).subscribe(
        userResponse => {
          console.log('User Created:', userResponse);

          // Actualización con los valores predeterminados
          const data = {
            description: plan,
            price: price,
            monthDuration: duration,
            trial: setTrial,
            userId: userResponse.id,
          };

          // Registra la suscripción
          this.authenService.registerSubscription(data).subscribe(
            subscriptionResponse => {
              console.log('Subscription Created:', subscriptionResponse);
              this.router.navigate(['/access']);
              alert("Registro completado");
              this.dialogRef.close();
            },
            error => {
              console.error('Error al crear la suscripción', error);
              this.errorMessage = 'Error al crear la suscripción';
            }
          );
        },
        error => {
          console.error('Error creating user:', error);
          this.errorMessage = error.error.message || 'Error registering user';
        }
      );
    }
  }
}
