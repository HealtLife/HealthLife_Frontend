import {Component, Input, OnInit} from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import {RouterLink, RouterLinkActive} from '@angular/router';
import { SwitcherComponent } from '../switcher/switcher.component';
import {MatAnchor, MatButton, MatIconButton} from '@angular/material/button';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {LoginDialogComponent} from '../../../HealthLife/Access/components/login-dialog/login-dialog.component';
import {RegisterDialogComponent} from '../../../HealthLife/Access/components/register-dialog/register-dialog.component';
import {AccessPagePage} from '../../../HealthLife/Access/pages/access-page/access-page.page';
import {MatIcon, MatIconModule} from '@angular/material/icon';

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

  constructor(protected router: Router, public dialog: MatDialog) {}

  features: Array<{ path: string; title: string; icon: string }> = [
    { path: 'home',            title: 'Home',       icon: 'home' },
    { path: 'home/nutrition',  title: 'Nutrition',  icon: 'restaurant_menu' },
    { path: 'home/activities',  title: 'Activities', icon: 'directions_run' },
    { path: 'notifications',    title: 'Notifications', icon: 'notifications' },
    { path: 'home/analysis',    title: 'Analysis',   icon: 'analytics' },
    { path: 'home/community',   title: 'Community',  icon: 'groups' },
    { path: 'home/rutines',     title: 'Rutines',    icon: 'schedule' },
    { path: 'profile/view',     title: 'Profile',    icon: 'person' },
    { path: 'access',           title: 'Log Out',    icon: 'logout' },
  ];

access = [
    { title: 'Register' },
    { title: 'Login' }
  ];

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      console.log('Ruta actual:', event.url);
    });
  }

  trackByTitle(index: number, option: any): string {
    return option.title;
  }

  openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent, {
      width: '400px'});
  }
  openRegDialog(): void {
    this.dialog.open(RegisterDialogComponent, {
      width: '900px', height:'600px'});
  }
}
