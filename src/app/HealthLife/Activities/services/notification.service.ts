import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8640/api/v1/recomendations/user';  // Base URL para obtener las recomendaciones por usuario

  constructor(private http: HttpClient) {}

  // Método para obtener las notificaciones de un usuario específico usando su userId
  getNotificationsByUser(userId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;  // Concatenamos el userId en la URL
    return this.http.get<any>(url);  // Hacemos la solicitud GET
  }
}
