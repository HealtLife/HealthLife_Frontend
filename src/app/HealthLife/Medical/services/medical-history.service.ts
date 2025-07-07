// src/app/HealthLife/MedicalHistory/services/medical-history.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface PersonalInfo { dni: string; fechaNacimiento: string; genero: string; tipoCuerpo: string; imc: number; }
export interface WeightHeight  { id: number; dni: string; peso: number; altura: number; fechaRegistro: string; }
export interface Vaccine       { id: number; dni: string; vacuna: string; fechaAplicacion: string; dosis:string;}
export interface Prescription  { id: number; dni: string; prescripcion: string; fecha_receta: string; medico: string; }
export interface MedicalNote   { id: number; dni: string; fecha_nota: string; notes: string; autor: string; }
export interface Allergy       { id: number; dni: string; alergia: string; reaccion: string; }

@Injectable({ providedIn: 'root' })
export class MedicalHistoryService {
  private base = `${environment.serverBasePath}/nutrition`;

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
