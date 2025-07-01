// src/app/HealthLife/Access/services/authen-api.service.ts

import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../../../shared/model/User/user.entity';

@Injectable({
  providedIn: 'root',
})
export class AuthenApiService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private baseService: BaseService<any>) {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  /** Login local (simula autenticación) */
  login(email: string, password: string): Observable<User | null> {
    return this.getAllUsers().pipe(
      map((users: User[]) => {
        const user = users.find(
          u => u.email === email && u.password === password
        );
        if (user) {
          // Ahora pasamos los 8 argumentos que el constructor requiere
          const loggedInUser = new User(
            user.id,
            user.name,
            user.lastname,
            user.email,
            user.password,
            user.created_at,
            user.privacy,
            (user as any).suscription ?? ''  // si no existe, cadena vacía
          );

          this.currentUserSubject.next(loggedInUser);
          localStorage.setItem('authUser', JSON.stringify(loggedInUser));
          return loggedInUser;
        }
        return null;
      })
    );
  }

  /** Obtener suscripción por usuario */
  getSubscription(userId: number): Observable<any> {
    return this.baseService.getAll('subscriptions').pipe(
      map((subs: any[]) => subs.find(s => s.id === userId))
    );
  }

  /** Observable del usuario actual */
  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  /** Actualiza el storage tras editar usuario */
  updateUserStorage(
    userId: number,
    updatedData: Partial<User>
  ): Observable<User> {
    return this.baseService.update('users', userId, updatedData).pipe(
      tap((updatedUser: User) => {
        const current = this.currentUserSubject.value;
        if (current && current.id === userId) {
          const merged = { ...current, ...updatedData } as User;
          this.currentUserSubject.next(merged);
          localStorage.setItem('authUser', JSON.stringify(merged));
        }
      })
    );
  }

  /** Registro de nuevo usuario */
  register(user: any): Observable<any> {
    // Adaptamos el payload para que incluya 'suscription'
    interface RegisterPayload {
      name: string;
      lastname: string;
      email: string;
      password: string;
      privacy: string;
      suscription: string;
    }

    const { name, lastname, email, password, privacy, suscription } = user;

    const transformData: RegisterPayload = {
      name,
      lastname,
      email,
      password,
      privacy,
      suscription
    };

    console.log('Register payload:', transformData);
    return this.baseService.create('users', transformData);
  }

  /** Crea una suscripción */
  registerSubscription(data: any): Observable<any> {
    console.log('Subscription payload:', data);
    return this.baseService.create('subscriptions', data);
  }

  /** Crea un goal */
  createGoal(data: any): Observable<any> {
    console.log('Goal payload:', data);
    return this.baseService.create('goals', data);
  }

  /** CRUD de usuarios */
  getAllUsers(): Observable<User[]> {
    return this.baseService.getAll('users');
  }

  getUserById(id: number): Observable<User> {
    return this.baseService.getById('users', id);
  }

  updateUser(user: User): Observable<User> {
    return this.baseService.update('users', user.id, user);
  }
}
