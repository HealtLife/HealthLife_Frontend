// src/app/HealthLife/MedicalHistory/services/report.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Report {
  id: number;
  userDni: string;
  titulo: string;
  fecha_creacion: string;
  url: string;
  estado: string;
}

export interface ReportRequest {
  titulo: string;
  userDni: string;
  allergies: boolean;
  notes: boolean;
  info: boolean;
  prescription: boolean;
  vaccine: boolean;
  weightHeight: boolean;
}

@Injectable({ providedIn: 'root' })
export class ReportService {
  private base = `${environment.serverBasePath}/reports`;

  create(request: ReportRequest): Observable<Report> {
    return this.http.post<Report>(this.base, request);
  }
  listByUser(dni: string): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.base}/usuario/${encodeURIComponent(dni)}`);
  }
  download(filename: string): Observable<Blob> {
    const params = new HttpParams().set('filename', filename);
    return this.http.get(this.base + '/descargar', { params, responseType: 'blob' });
  }

  constructor(private http: HttpClient) {}
}
