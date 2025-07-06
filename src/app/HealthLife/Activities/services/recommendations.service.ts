// src/app/HealthLife/Activities/services/recommendation.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Recommendation {
  id: number;
  userId: number;
  nutritionistId: number | null;
  message: string;
  answer: string;
  type: string;
  status: string;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class RecommendationService {
  private baseUrl = environment.serverBasePath;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Recommendation[]> {
    return this.http.get<Recommendation[]>(`${this.baseUrl}/recomendations`);
  }

  create(rec: Partial<Recommendation>): Observable<Recommendation> {
    return this.http.post<Recommendation>(`${this.baseUrl}/recomendations`, rec);
  }

  update(id: number, rec: Partial<Recommendation>): Observable<Recommendation> {
    return this.http.put<Recommendation>(`${this.baseUrl}/recomendations/${id}`, rec);
  }
}
