import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutinaApiService {
  muscle = 'biceps';
  apiKey = 'ZUqYEhP6qjqc24vBj6Oa4Q==2HnQGaTSpbjXGVWA';
  baseUrl = 'https://api.api-ninjas.com/v1/exercises';


  constructor(private http: HttpClient) { }

  getExercises(muscle: any): Observable<any> {
    const headers = new HttpHeaders().set('X-Api-Key', this.apiKey);
    const url = `${this.baseUrl}?muscle=${muscle}`;
    return this.http.get(url, { headers });
  }
}
