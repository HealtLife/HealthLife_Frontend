import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

export interface Profile {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: string;
  privacy: string;
}

@Injectable({ providedIn: 'root' })
export class ProfileApiService {
  private baseUrl = environment.serverBasePath; // e.g. http://localhost:8080/api/v1

  constructor(private http: HttpClient) {}

  /** GET /users/{id} */
  getUserById(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseUrl}/users/${id}`);
  }

  /** PUT /users/{id} */
  updateUser(id: number, data: Partial<Profile>): Observable<Profile> {
    return this.http.put<Profile>(`${this.baseUrl}/users/${id}`, data);
  }
}
