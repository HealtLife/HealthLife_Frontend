import { Component, OnInit } from '@angular/core';
import { AuthenApiService } from '../../../Access/services/authen-api.service';
import {MatCard} from '@angular/material/card';
import {MatList, MatListItem} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatLine} from '@angular/material/core';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';

interface User {
  name: string;
  lastname: string;
}

interface Action {
  path: string;
  icon: string;
  title: string;
}

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  standalone: true,
  imports: [
    MatCard,
    MatList,
    MatListItem,
    MatIcon,
    MatLine,
    NgForOf
  ],
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {
  currentUser: User | null = null;

  phrases: string[] = [
    '¡Hoy es un gran día para cuidarte!',
    'Estás a un paso de tus objetivos.',
    'Mantén la constancia y la disciplina.'
  ];

  // Sólo las 3 acciones nuevas con su ruta y componente asociado
  actions: Action[] = [
    { icon: 'credit_card', title: 'Actualizar plan',       path: '/profile/payment' },
    { icon: 'schedule',     title: 'Mirar rutinas',         path: '/home/rutines' },
    { icon: 'notifications',title: 'Notificaciones pendientes', path: '/notifications' },
  ];

  constructor(
    private authService: AuthenApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      console.error('No se encontró email de usuario en localStorage');
      return;
    }
    this.authService.getUserByEmail(email).subscribe({
      next: users => {
        if (users?.length) {
          const u = users[0];
          this.currentUser = { name: u.name, lastname: u.lastname };
        } else {
          console.error('Usuario no encontrado por email:', email);
        }
      },
      error: err => console.error('Error al obtener usuario por email', err)
    });
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
