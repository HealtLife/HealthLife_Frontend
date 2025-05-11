import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PexelsService {
  private apiKey: string = 'fordXD2x3QUMpmx3yGyIQcz7rDQlzx2AacGyXyEQWtokZj5A3rKvnYfD';
  private apiPhotoUrl: string = 'https://api.pexels.com/v1/search';
  private apiVideoUrl: string = 'https://api.pexels.com/videos/search';

  constructor(private http: HttpClient) {}

  searchPhotos(query: string, perPage: number = 5): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.apiKey
    });
    return this.http.get(`${this.apiPhotoUrl}?query=${query}&per_page=${perPage}`, { headers });
  }

  searchVideos(query: string, perPage: number = 5): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.apiKey
    });
    return this.http.get(`${this.apiVideoUrl}?query=${query}&per_page=${perPage}`, { headers });
  }
}
