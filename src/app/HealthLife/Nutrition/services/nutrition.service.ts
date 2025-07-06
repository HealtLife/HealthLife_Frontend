// src/app/Nutrition/services/nutrition.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import * as Models from '../Model/nutrition.model';

@Injectable({ providedIn: 'root' })
export class NutritionService {
  private base = `${environment.serverBasePath}/nutrition`;

  constructor(private http: HttpClient) {}

  /** Personal Info */
  getPersonalInfo(dni: string): Observable<Models.PersonalInfo> {
    return this.http.get<Models.PersonalInfo>(`${this.base}/personal-info/${dni}`);
  }
  createPersonalInfo(pi: Models.PersonalInfo): Observable<Models.PersonalInfo> {
    return this.http.post<Models.PersonalInfo>(`${this.base}/personal-info`, pi);
  }
  updatePersonalInfo(dni: string, pi: Models.PersonalInfo): Observable<Models.PersonalInfo> {
    return this.http.put<Models.PersonalInfo>(`${this.base}/personal-info/${dni}`, pi);
  }

  /** Weight & Height */
  getWeightHeights(dni: string): Observable<Models.WeightHeight[]> {
    return this.http.get<Models.WeightHeight[]>(`${this.base}/weightheight/${dni}`);
  }
  createWeightHeight(wh: Models.WeightHeight): Observable<Models.WeightHeight> {
    return this.http.post<Models.WeightHeight>(`${this.base}/weightheight`, wh);
  }
  updateWeightHeight(id: number, wh: Models.WeightHeight): Observable<Models.WeightHeight> {
    return this.http.put<Models.WeightHeight>(`${this.base}/weightheight/${id}`, wh);
  }

  /** Vaccines */
  getVaccines(dni: string): Observable<Models.Vaccine[]> {
    return this.http.get<Models.Vaccine[]>(`${this.base}/vaccine/${dni}`);
  }
  createVaccine(v: Models.Vaccine): Observable<Models.Vaccine> {
    return this.http.post<Models.Vaccine>(`${this.base}/vaccine`, v);
  }
  updateVaccine(id: number, v: Models.Vaccine): Observable<Models.Vaccine> {
    return this.http.put<Models.Vaccine>(`${this.base}/vaccine/${id}`, v);
  }

  /** Prescriptions */
  getPrescriptions(dni: string): Observable<Models.Prescription[]> {
    return this.http.get<Models.Prescription[]>(`${this.base}/prescription/${dni}`);
  }
  createPrescription(p: Models.Prescription): Observable<Models.Prescription> {
    return this.http.post<Models.Prescription>(`${this.base}/prescription`, p);
  }
  updatePrescription(id: number, p: Models.Prescription): Observable<Models.Prescription> {
    return this.http.put<Models.Prescription>(`${this.base}/prescription/${id}`, p);
  }

  /** Medical Notes */
  getMedicalNotes(dni: string): Observable<Models.MedicalNote[]> {
    return this.http.get<Models.MedicalNote[]>(`${this.base}/medical-note/${dni}`);
  }
  createMedicalNote(m: Models.MedicalNote): Observable<Models.MedicalNote> {
    return this.http.post<Models.MedicalNote>(`${this.base}/medical-note`, m);
  }
  updateMedicalNote(id: number, m: Models.MedicalNote): Observable<Models.MedicalNote> {
    return this.http.put<Models.MedicalNote>(`${this.base}/medical-note/${id}`, m);
  }

  /** Allergies */
  getAllergies(dni: string): Observable<Models.Allergy[]> {
    return this.http.get<Models.Allergy[]>(`${this.base}/allergies/${dni}`);
  }
  createAllergy(a: Models.Allergy): Observable<Models.Allergy> {
    return this.http.post<Models.Allergy>(`${this.base}/allergies`, a);
  }
  updateAllergy(id: number, a: Models.Allergy): Observable<Models.Allergy> {
    return this.http.put<Models.Allergy>(`${this.base}/allergies/${id}`, a);
  }

  /** Fitness: muscles, exercises, equipments */
  getMuscles(): Observable<Models.Muscle[]> {
    return this.http.get<Models.Muscle[]>(`${this.base}/fitness/muscles`);
  }
  getExercises(): Observable<Models.Exercise[]> {
    return this.http.get<Models.Exercise[]>(`${this.base}/fitness/exercises`);
  }
  getEquipments(): Observable<Models.Equipment[]> {
    return this.http.get<Models.Equipment[]>(`${this.base}/fitness/equipments`);
  }
  getExercisesByMuscle(muscle: string): Observable<Models.Exercise[]> {
    return this.http.get<Models.Exercise[]>(`${this.base}/fitness/muscles/${muscle}/exercises`);
  }
  getExercisesByEquipment(equipment: string): Observable<Models.Exercise[]> {
    return this.http.get<Models.Exercise[]>(`${this.base}/fitness/equipments/${equipment}/exercises`);
  }
  getExercisesByBodyPart(bodyPart: string): Observable<Models.Exercise[]> {
    return this.http.get<Models.Exercise[]>(`${this.base}/fitness/bodyparts/${bodyPart}/exercises`);
  }


}
