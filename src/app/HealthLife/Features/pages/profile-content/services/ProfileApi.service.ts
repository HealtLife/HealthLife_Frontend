import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BaseService} from '../../../../../shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {
  private endpoint: string = 'users';  // Cambia la URL según la estructura de tu API

  constructor(private baseService: BaseService<any>) { }

  updateUser(userId: number, data: any): Observable<any> {
    return this.baseService.update(this.endpoint, userId, data);
  }

}
