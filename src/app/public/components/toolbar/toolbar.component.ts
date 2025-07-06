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

  features = [
    { path: 'home', title: 'Home' },
    { path: 'home/nutrition', title: 'Nutrition' },
    { path: 'home/activities', title: 'Activities' },
    { path: 'notifications', title: 'Notifications' },
    { path: 'home/analysis', title: 'Analysis' },
    { path: 'home/community', title: 'Community' },
    { path: 'home/rutines', title: 'Rutines' },
    { path: 'profile/view', title: 'Profile' },
    { path: 'access', title: 'Log Out' },

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
