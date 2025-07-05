import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Recommendation } from '../models/recommendations.entity';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService extends BaseService<any> {
  public endpoint = 'activities';        // Recurso de actividades
  public endpoint2 = 'recommendations';  // Recurso de recomendaciones

  constructor(protected override http: HttpClient) {
    super(http);
  }

  // Método para obtener recomendaciones
  getRecommendations(): Observable<Recommendation[]> {
    return this.getAll(this.endpoint2);
  }

  // CRUD de actividades
  getAllActivities(): Observable<any[]> {
    return this.getAll(this.endpoint);
  }

  getActivityById(id: number): Observable<any> {
    return this.getById(this.endpoint, id);
  }

  deleteActivity(id: number): Observable<any> {
    return this.delete(this.endpoint, id);
  }

  createActivity(data: any): Observable<any> {
    return this.create(this.endpoint, data);
  }

  /**
   * Búsqueda de actividades
   * Asume endpoint: GET /activities/search?query=...
   */
  searchActivities(query: string): Observable<any[]> {
    const url = `${environment.serverBasePath}/${this.endpoint}/search`;
    return this.http.get<any[]>(url, {
      params: { query }
    });
  }
}
