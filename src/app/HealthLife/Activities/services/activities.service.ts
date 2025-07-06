// src/app/shared/services/activities.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface ActivityDto {
  id?: number;
  name: string;
  description: string;
  duration: number;
  userId: number;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({ providedIn: 'root' })
export class ActivitiesService {
  private baseUrl = environment.serverBasePath; // e.g. "http://localhost:8080/api/v1"

  constructor(private http: HttpClient) {}

  getAll(): Observable<ActivityDto[]> {
    return this.http.get<ActivityDto[]>(`${this.baseUrl}/activities`);
  }

  getById(id: number): Observable<ActivityDto> {
    return this.http.get<ActivityDto>(`${this.baseUrl}/activities/${id}`);
  }

  searchByName(name: string): Observable<ActivityDto[]> {
    return this.http.get<ActivityDto[]>(
      `${this.baseUrl}/activities/search?name=${encodeURIComponent(name)}`
    );
  }

  create(activity: ActivityDto): Observable<ActivityDto> {
    return this.http.post<ActivityDto>(
      `${this.baseUrl}/activities`,
      activity
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/activities/${id}`);
  }
}
