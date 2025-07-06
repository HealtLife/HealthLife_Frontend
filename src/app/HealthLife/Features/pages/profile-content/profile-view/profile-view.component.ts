import { Component, OnInit }                   from '@angular/core';
import { Router }                              from '@angular/router';
import { MatSnackBar }                         from '@angular/material/snack-bar';
import { MatDialog }                           from '@angular/material/dialog';

import {
  ProfileApiService,
  Profile,
  SubscriptionDetail
} from '../services/ProfileApi.service';
import { ProfileEditComponent }                from '../profile-edit/profile-edit.component';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import {MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatLabel,
    MatCardActions,
    MatButton,
    MatIcon,
    NgIf
  ],
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  currentUser!: Profile;
  subscription?: SubscriptionDetail;

  constructor(
    private profileApi: ProfileApiService,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) return;

    // Cargar datos de usuario
    this.profileApi.getUserById(userId).subscribe(user => {
      this.currentUser = user;

      // Cargar detalle de suscripción
      this.profileApi.getUserSubscription(userId).subscribe(sub => {
        this.subscription = sub;
      }, () => {
        this.subscription = undefined;
      });
    });
  }

  onEdit(): void {
    const ref = this.dialog.open(ProfileEditComponent, {
      width: '500px',
      data: { user: this.currentUser }
    });
    ref.afterClosed().subscribe((updated: Profile) => {
      if (updated) {
        this.currentUser = updated;
        this.snack.open('Perfil actualizado', 'Cerrar', { duration: 2000 });
      }
    });
  }

  onUpgrade(): void {
    // Navegar al flujo de suscripción (o abrir diálogo)
    this.router.navigate(['/profile/payment']);
  }
}
