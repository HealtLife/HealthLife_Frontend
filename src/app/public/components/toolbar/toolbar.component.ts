import { Component, OnInit }         from '@angular/core';
import { MatToolbar }                from '@angular/material/toolbar';
import { Router, NavigationEnd }     from '@angular/router';
import { filter }                    from 'rxjs/operators';
import { Title }                     from '@angular/platform-browser';
import { MatDialog }                 from '@angular/material/dialog';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { SwitcherComponent }           from '../switcher/switcher.component';
import { MatAnchor, MatButton, MatIconButton } from '@angular/material/button';
import { NgForOf, NgIf, NgOptimizedImage }      from '@angular/common';
import { MatIcon, MatIconModule }      from '@angular/material/icon';

import { LoginDialogComponent }    from '../../../HealthLife/Access/components/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../../../HealthLife/Access/components/register-dialog/register-dialog.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbar,
    RouterLink,
    SwitcherComponent,
    MatAnchor,
    NgIf,
    NgForOf,
    NgOptimizedImage,
    MatIcon,
    MatButton,
    RouterLinkActive,
    MatIconButton,
    MatIconModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  /** Definición de rutas con título e ícono */
  features: Array<{ path: string; title: string; icon: string }> = [
    { path: 'home',            title: 'Home',            icon: 'home' },
    { path: 'nutrition',  title: 'Nutrition',       icon: 'restaurant_menu' },
    { path: 'activities', title: 'Activities',      icon: 'directions_run' },
    { path: 'notifications',   title: 'Notifications',   icon: 'notifications' },
    { path: 'medical',   title: 'Medical History', icon: 'medical_services' },
    { path: 'recommendations', title: 'Recommendations', icon: 'recommendations' },
    { path: 'home/rutines',    title: 'Rutines',         icon: 'schedule' },
    { path: 'profile/view',    title: 'Profile',         icon: 'person' },
    { path: 'access',          title: 'Log Out',         icon: 'logout' },
  ];

  /** Texto del título activo */
  activeTitle = 'HealthLife';

  constructor(
    public router: Router,
    private titleService: Title,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // Cada vez que cambia la ruta, actualizamos activeTitle y el <title>
    this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe((evt: NavigationEnd) => {
        const url = evt.urlAfterRedirects.replace(/^\//, '');
        const match = this.features.find(f => url.startsWith(f.path));
        this.activeTitle = match ? match.title : 'HealthLife';
        this.titleService.setTitle(`${this.activeTitle} — HealthLife`);
      });
  }

  /** Navega a la ruta indicada */
  navigate(path: string) {
    this.router.navigate([path]);
  }

  /** Abre diálogo de login */
  openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent, { width: '600px' });
  }

  /** Abre diálogo de registro */
  openRegDialog(): void {
    this.dialog.open(RegisterDialogComponent, { width: '900px', height: '600px' });
  }

  /** trackBy para ngFor en accesos */
  trackByTitle(_idx: number, opt: any) {
    return opt.title;
  }
}
