// src/app/HealthLife/Activities/services/notification.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Notification {
  id?: number;
  userId: number;
  message: string;
  type: string;
  status: string;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private baseUrl = environment.serverBasePath; // http://localhost:8080/api/v1

  constructor(private http: HttpClient) {}

  /** GET /notisender/user/{userId} */
  getByUser(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/notisender/user/${userId}`);
  }
}
