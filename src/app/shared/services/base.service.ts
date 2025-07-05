import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BaseService<T> {

  constructor(protected http: HttpClient) {}

  /** Devuelve siempre la URL base (sin resource ni versión) */
  private getBasePath(): string {
    return environment.serverBasePath;
  }

  /** Obtener todos */
  getAll(resource: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.getBasePath()}/${resource}`);
  }

  /** Obtener por ID */
  getById(resource: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.getBasePath()}/${resource}/${id}`);
  }

  /** Crear */
  create(resource: string, data: T): Observable<T> {
    return this.http.post<T>(`${this.getBasePath()}/${resource}`, data);
  }

  /** Actualizar */
  update(resource: string, id: number, data: T): Observable<T> {
    return this.http.put<T>(`${this.getBasePath()}/${resource}/${id}`, data);
  }

  /** Eliminar */
  delete(resource: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.getBasePath()}/${resource}/${id}`);
  }
}
