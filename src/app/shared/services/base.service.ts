import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BaseService<T> {

  protected apiUrl: string = `${environment.serverBasePath}`;

  protected resourceEndPoint: string = '/resources';

  protected resourcePath(): string {
    return `${this.apiUrl}${this.resourceEndPoint}`;
  }

  constructor(protected http: HttpClient) {}

  getAll(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${endpoint}`);
  }
  getById(endpoint: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}/${id}`);
  }
  create(endpoint: string, item: T): Observable<T> {

    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, item);
  }
  update(endpoint: string, id: number, item: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}/${id}`, item);
  }
  delete(endpoint: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${endpoint}/${id}`);
  }

  deleteByFk(endpoint: string, id: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${endpoint}/${id}/${userId}`);
  }
}

