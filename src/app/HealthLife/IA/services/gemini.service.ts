import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private readonly apiKey = '';
  // No se gasten el numero de consulta >:c
  // private readonly apiKey = 'AIzaSyDzZK9gC8WY6uT1u-TM_dgbZa4bcCLCtfE';
  private readonly url =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  constructor(private http: HttpClient) {}

  sendMessage(prompt: string): Observable<string> {
    const body = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-goog-api-key': this.apiKey
    });

    return this.http.post<any>(this.url, body, { headers }).pipe(
      tap(res => console.log('💬 RAW RESPONSE:', res)),   // opcional: para debugging
      map(res => {
        // Extraemos el texto que está en candidates[0].content.parts[0].text
        const cand = res.candidates?.[0];
        if (cand?.content?.parts?.[0]?.text) {
          return cand.content.parts[0].text.trim();
        }
        // Si no existe, devolvemos un mensaje de fallback
        return 'Sin respuesta';
      })
    );
  }
}
