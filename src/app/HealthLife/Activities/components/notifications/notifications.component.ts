// src/app/HealthLife/Activities/components/notifications/notifications.component.ts

import { Component, OnInit }             from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { MatIconModule }       from '@angular/material/icon';
import { MatCardModule }       from '@angular/material/card';
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatButtonModule }     from '@angular/material/button';
import { MatDividerModule }    from '@angular/material/divider';

import {
  Notification,
  NotificationService
} from '../../services/notification.service';
import {MatBadge} from '@angular/material/badge';
import {MatList, MatListItem} from '@angular/material/list';
import {MatToolbar} from '@angular/material/toolbar';
import {MatLine} from '@angular/material/core';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatBadge,
    MatListItem,
    MatList,
    MatToolbar,
    MatLine
  ],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notifSvc: NotificationService) {}

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId'));
    if (userId) {
      this.notifSvc.getByUser(userId).subscribe(
        list => this.notifications = list,
        err  => console.error('Error al cargar notificaciones', err)
      );
    }
  }
}
