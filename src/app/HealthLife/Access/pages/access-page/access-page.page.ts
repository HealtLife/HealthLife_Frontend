import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {LoginDialogComponent} from '../../components/login-dialog/login-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {RegisterDialogComponent} from '../../components/register-dialog/register-dialog.component';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatIcon} from '@angular/material/icon';
import {MatCard} from '@angular/material/card';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-access-page',
  standalone: true,
  imports: [
    MatButton,
    MatToolbar,
    MatGridTile,
    MatIcon,
    MatGridList,
    MatCard,
    NgForOf
  ],
  templateUrl: './access-page.page.html',
  styleUrl: './access-page.page.css'
})
export class AccessPagePage {

  features: Array<{ title: string; desc: string; icon: string }> = [
    { title: 'Seguimiento Personalizado', desc: 'de pasos, entrenamientos y calorías.', icon: 'directions_run' },
    { title: 'Planes de Nutrición',        desc: 'adaptativos según tus objetivos.',    icon: 'restaurant_menu' },
    { title: 'Monitoreo de Sueño',         desc: 'y calidad de descanso.',              icon: 'hotel' },
    { title: 'Recomendaciones de Dieta',   desc: 'basadas en tu historial.',           icon: 'emoji_food_beverage' },
    { title: 'Gráficos de Progreso',       desc: 'semanales y mensuales.',             icon: 'show_chart' },
    { title: 'Motivación Diaria',          desc: 'con retos y badges.',                 icon: 'emoji_events' },
    { title: 'Comunidad y Grupos',         desc: 'para compartir logros.',              icon: 'groups' },
    { title: 'Análisis Avanzado',          desc: 'para detectar patrones.',             icon: 'analytics' },
  ];

}
