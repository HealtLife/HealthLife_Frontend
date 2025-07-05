import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenApiService {

  private baseUrl = environment.serverBasePath;

  constructor(private http: HttpClient) { }

  /** Registro de usuario sin suscripción */
  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, userData);
  }

  /** Registro de suscripción para un usuario */
  registerSubscription(userId: number, subscriptionData: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/users/${userId}/subscription`,
      subscriptionData
    );
  }

  /** Login */
  login(email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/users`,
      { email, password }
    );
  }

  /** Actualizar perfil de usuario */
  updateUserStorage(id: number, formattedData: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/users/${id}`,
      formattedData
    );
  }

  /** Obtener datos del usuario actualmente logueado */
  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/me`);
  }

  /**
   * Obtener la suscripción del usuario
   * Asume endpoint: GET /users/{userId}/subscription
   */
  getSubscription(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${userId}/subscription`);
  }

  getUserByEmail(email: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/users/email/${encodeURIComponent(email)}`
    );
  }
}
