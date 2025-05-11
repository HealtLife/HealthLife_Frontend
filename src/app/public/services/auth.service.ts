import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  constructor() {

    const token = localStorage.getItem('user_token');
    if (token) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(): void {
    localStorage.setItem('user_token', 'example_token');
    this.isAuthenticatedSubject.next(true);
  }

  logout(): void {

    localStorage.removeItem('user_token');
    this.isAuthenticatedSubject.next(false);
  }
}
