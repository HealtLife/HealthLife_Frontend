import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Recommendation } from '../models/recommendations.entity';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService extends BaseService<any> {
  public endpoint = 'activities';  // Recurso de actividades
  public endpoint2 = 'recommendations';  // Recurso de recomendaciones

  constructor(protected override http: HttpClient) {
    super(http);  // Llamada al constructor de la clase base
  }

  // Método para obtener recomendaciones
  getRecommendations(): Observable<Recommendation[]> {
    return this.getAll(this.endpoint2);  // Obtienes las recomendaciones
  }

  // CRUD de actividades
  getAllActivities(): Observable<any[]> {
    return this.getAll(this.endpoint);  // Método para obtener todas las actividades
  }

  getActivityById(id: number): Observable<any> {
    return this.getById(this.endpoint, id);  // Obtener actividad por ID
  }

  deleteActivity(id: number): Observable<any> {
    return this.delete(this.endpoint, id);  // Eliminar actividad por ID
  }

  createActivity(data: any): Observable<any> {
    return this.create(this.endpoint, data);  // Crear una nueva actividad
  }

  searchActivities(query: string): Observable<any[]> {
    // Usamos directamente el endpoint y agregamos la query de búsqueda
    return this.http.get<any[]>(`${environment.serverBasePathActivities}/search?query=${query}`);
  }
}
