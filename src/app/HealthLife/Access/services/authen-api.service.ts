import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenApiService {

  private baseUrl: string = 'http://localhost:8081/api/v1';  // URL del backend

  constructor(private http: HttpClient) { }

  // Método para crear un usuario sin suscripción
  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, userData);
  }

  // Método para crear una suscripción
  registerSubscription(subscriptionData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/subscriptions/user-subscription`, subscriptionData);
  }

  // Obtener el usuario actual
  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/current`);
  }

  // Método para obtener la suscripción de un usuario por ID
  getSubscription(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/subscriptions/${id}`);
  }

  // Método para realizar el login de un usuario
  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${this.baseUrl}/users/login`, loginData);
  }

  // Método para actualizar la información del usuario
  updateUserStorage(id: number, formattedData: any): Observable<any> {
    // Aquí se hace la solicitud PUT para actualizar el usuario
    return this.http.put(`${this.baseUrl}/users/${id}`, formattedData);
  }
}
