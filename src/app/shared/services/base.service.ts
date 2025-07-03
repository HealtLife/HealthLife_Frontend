import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T> {

  protected http: HttpClient;  // Cambié 'private' a 'protected'

  constructor(http: HttpClient) {
    this.http = http;
  }

  private getBasePath(resource: string): string {
    // Decidir la URL base en función del recurso
    switch (resource) {
      case 'users':
        return environment.serverBasePathUsers;
      case 'subscriptions':
        return environment.serverBasePathSubscription;
      default:
        return environment.serverBasePath;
    }
  }

  // Método genérico para obtener todos los elementos de un recurso
  getAll(resource: string): Observable<T[]> {
    const basePath = this.getBasePath(resource);
    return this.http.get<T[]>(`${basePath}/${resource}`);
  }

  // Método genérico para obtener un elemento por id
  getById(resource: string, id: number): Observable<T> {
    const basePath = this.getBasePath(resource);
    return this.http.get<T>(`${basePath}/${resource}/${id}`);
  }

  // Método genérico para crear un nuevo elemento
  create(resource: string, data: T): Observable<T> {
    const basePath = this.getBasePath(resource);
    return this.http.post<T>(`${basePath}/${resource}`, data);
  }

  // Método genérico para actualizar un elemento
  update(resource: string, id: number, data: T): Observable<T> {
    const basePath = this.getBasePath(resource);
    return this.http.put<T>(`${basePath}/${resource}/${id}`, data);
  }

  // Método genérico para eliminar un elemento
  delete(resource: string, id: number): Observable<void> {
    const basePath = this.getBasePath(resource);
    return this.http.delete<void>(`${basePath}/${resource}/${id}`);
  }
}
