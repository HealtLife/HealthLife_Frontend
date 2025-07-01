// src/app/services/authen-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User }        from '../../shared/model/User/user.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthenApiService {
  private baseUrl = environment.serverBasePath; // http://localhost:8081/api/v1

  constructor(private http: HttpClient) { }

  /** Obtiene un usuario por su ID */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  /** Obtiene un usuario por su email */
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(
      `${this.baseUrl}/users/email/${encodeURIComponent(email)}`
    );
  }

  /** Lista todos los usuarios */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  /** Crea un nuevo usuario */
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, user);
  }

  /** Actualiza un usuario existente */
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${id}`, user);
  }

  /** Elimina un usuario */
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${id}`);
  }

  /**
   * Actualiza la suscripción de un usuario.
   * Según tu Swagger: PUT /api/v1/users/update-subscription
   */
  updateSubscription(data: {
    userId: number;
    description: string;
    price: number;
    monthDuration: number;
    trial: boolean;
  }): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/users/update-subscription`,
      data
    );
  }

  /**
   * Crea un goal para el usuario.
   * (Recuerda ajustar la ruta si tu API expone otro endpoint)
   */
  createGoal(goal: {
    goal_type: string;
    start_date: string;
    end_date: string;
    userId: number;
  }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/goals`, goal);
  }
}
