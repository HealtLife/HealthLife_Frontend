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

export interface Report{
  usuarioDni: string;
  titulo: string;
  fecha_creacion: string;
  url: string;
  estado: string;
}

@Injectable({ providedIn: 'root' })
export class ReportService {
  private base =`${environment.serverBasePath}/nutrition`;

  constructor(private http: HttpClient) { }

  /** Create Report **/
  create(request: ReportRequest): Observable<Report>{
    return this.http.post<Report>(
      `${this.base}/generate-report`, request
    )
  };

  /** GET **/
  listByUser(dni: string): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.base}/reports/${encodeURIComponent(dni)}`);
  }

  /** Descarga un archivo PDF con su nombre **/
  download(filename: string): Observable<Blob> {
    return this.http.get(`${this.base}/download-report`, {
      params: new HttpParams().set('filename', filename),
      responseType: 'blob'
    });
  }
}
