import { Injectable } from '@angular/core';
import {BaseService} from '../../../shared/services/base.service';
import {HttpClient} from '@angular/common/http';
import {Recommendation} from '../models/recommendations.entity';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService extends BaseService<any> {
  public endpoint = 'activities';
  public endpoint2 = 'recommendations';

  constructor(protected override http: HttpClient ) {
    super(http);
    this.resourceEndPoint = '/activities';
  }
  getRecommendations(): Observable<Recommendation[]> {
    return this.getAll(this.endpoint2);
  }

}
