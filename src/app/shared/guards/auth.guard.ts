import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthenApiService } from '../../HealthLife/Access/services/authen-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private authenService: AuthenApiService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authenService.getCurrentUser().pipe(
      map(user => {
        if (user) {
          return true;
        }
        // Si la API responde con un objeto vacío o null
        this.router.navigate(['/access'], {
          queryParams: { returnUrl: state.url }
        });
        return false;
      }),
      catchError(err => {
        // En caso de 401 u otro error de redirección
        this.router.navigate(['/access'], {
          queryParams: { returnUrl: state.url }
        });
        return of(false);
      })
    );
  }
}
