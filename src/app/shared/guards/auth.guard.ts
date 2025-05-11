import { CanActivateFn } from '@angular/router';
import {AuthenApiService} from '../../Nutrimove/Access/services/authen-api.service';
import {CanActivate, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {

  constructor(private authenService: AuthenApiService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authenService.getCurrentUser().pipe(
      map((user) => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/access']);
          return false;
        }
      })
    );
  }
}
