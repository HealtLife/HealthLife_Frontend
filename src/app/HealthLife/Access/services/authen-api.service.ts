import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import { map } from 'rxjs/operators';
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

  login(email: string, password: string): Observable<User | null> {
    this.getAllUsers();
    return this.getAllUsers().pipe(
      map((users: User[]) => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          this.currentUserSubject.next(new User(
            user.id,
            user.name,
            user.lastname,
            user.email,
            user.password,
            user.created_at,
            user.privacy
          ));

          localStorage.setItem('authUser', JSON.stringify(user));
        }
        return user ? user : null;
      })
    );
  }



  getSubscription(userId: number): Observable<any>{

    return this.baseService.getAll('subscriptions').pipe(
      map(sub => {
        return sub.find(sub => sub.id === userId);
      })
    )
  }
  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  updateUserStorage(userId: number, updatedData: Partial<User>): Observable<User> {
    return this.baseService.update("users",userId, updatedData).pipe(
      tap((updatedUser: User) => {

        const currentUser = this.currentUserSubject.value;
        if (currentUser && currentUser.id === userId) {
          const newUser = { ...currentUser, ...updatedData };
          this.currentUserSubject.next(newUser);

          localStorage.setItem('authUser', JSON.stringify(newUser));
        }
      })
    );
  }

  register(user: any): Observable<any> {

    interface UserData {
      name: string;
      lastname: string;
      email: string;
      password: string;
      privacy: string;
    }

    const { name, lastname, email, password, privacy } = user;


    const transformData: UserData = { name, lastname, email, password, privacy };


    return this.baseService.create('users', transformData);
  }

  registerSubscription(data: any): Observable<any> {
    console.log(data);
    return this.baseService.create('subscriptions', data);
  }

  createGoal(data: any):Observable<any>{
    console.log(data);
    return this.baseService.create("goals", data);
  }


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
