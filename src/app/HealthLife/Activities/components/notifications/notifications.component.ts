import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  standalone: true,
  imports: [
    DatePipe
  ],
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: Array<any> = [];
  loading: boolean = true;
  error: boolean = false;
  errorMessage: string = '';
  userId: string = '123';  // Aquí puedes pasar el userId de alguna fuente, por ejemplo, el usuario logueado

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  // Llamamos al servicio para obtener las notificaciones del usuario específico
  loadNotifications(): void {
    this.notificationService.getNotificationsByUser(this.userId).subscribe(
      (data: any) => {
        this.notifications = data;  // Asignamos las notificaciones obtenidas
        this.loading = false;        // Deja de mostrar "Cargando"
      },
      (error: any) => {
        console.error('Error al obtener las notificaciones:', error);
        this.error = true;           // Muestra el mensaje de error
        this.loading = false;        // Deja de mostrar "Cargando"

        // Asignar el mensaje de error adecuado
        if (error.status === 0) {
          this.errorMessage = 'No se pudo conectar al servidor. Por favor, revisa tu conexión.';
        } else if (error.status >= 500) {
          this.errorMessage = 'Hubo un problema en el servidor. Intenta nuevamente más tarde.';
        } else if (error.status >= 400) {
          this.errorMessage = 'Hubo un error al obtener las notificaciones. Por favor, intenta nuevamente.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado. Intenta nuevamente.';
        }
      }
    );
  }
}
