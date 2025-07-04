import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthenApiService } from '../../../Access/services/authen-api.service';
import { Router } from '@angular/router';

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
    MatButtonModule
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
          // Si la creación es exitosa, podemos navegar o hacer algo más
          this.dialogRef.close(userResponse); // Cierra el diálogo y pasa la respuesta
          this.router.navigate(['/home']); // Por ejemplo, redirige a la página principal
        },
        error => {
          console.error('Error creating user:', error);
          // Mostrar el mensaje de error en el frontend
          this.errorMessage = error.error.message || 'Error registering user';
        }
      );
    }
  }

  // Método que maneja la cancelación del registro
  onCancel(): void {
    this.dialogRef.close(); // Si el usuario cancela, simplemente cerramos el diálogo
  }
}
