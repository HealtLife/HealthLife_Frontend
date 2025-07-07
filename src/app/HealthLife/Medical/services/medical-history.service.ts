// src/app/HealthLife/MedicalHistory/services/medical-history.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface PersonalInfo { dni: string; fechaNacimiento: string; genero: string; tipoCuerpo: string; imc: number; }
export interface WeightHeight  { id: number; dni: string; weightKg: number; heightCm: number; date: string; }
export interface Vaccine       { id: number; dni: string; name: string; date: string; }
export interface Prescription  { id: number; dni: string; medication: string; dosage: string; frequency: string; }
export interface MedicalNote   { id: number; dni: string; note: string; date: string; }
export interface Allergy       { id: number; dni: string; name: string; severity: string; }

@Injectable({ providedIn: 'root' })
export class MedicalHistoryService {
  private base = `${environment.serverBasePath}/medical-history`;

  constructor(private http: HttpClient) {}

  getPersonalInfo(dni: string): Observable<PersonalInfo> {
    return this.http.get<PersonalInfo>(`${this.base}/personal-info/${dni}`);
  }
  getWeightHeight(dni: string): Observable<WeightHeight[]> {
    return this.http.get<WeightHeight[]>(`${this.base}/weightheight/${dni}`);
  }
  getVaccines(dni: string): Observable<Vaccine[]> {
    return this.http.get<Vaccine[]>(`${this.base}/vaccine/${dni}`);
  }
  getPrescriptions(dni: string): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(`${this.base}/prescription/${dni}`);
  }
  getMedicalNotes(dni: string): Observable<MedicalNote[]> {
    return this.http.get<MedicalNote[]>(`${this.base}/medical-note/${dni}`);
  }
  getAllergies(dni: string): Observable<Allergy[]> {
    return this.http.get<Allergy[]>(`${this.base}/allergies/${dni}`);
  }
}
