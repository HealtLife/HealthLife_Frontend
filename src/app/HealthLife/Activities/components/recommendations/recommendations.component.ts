import { Component, OnInit }                       from '@angular/core';
import { CommonModule, DatePipe }                  from '@angular/common';
import { FormsModule }                             from '@angular/forms';

// Angular Material
import { MatToolbarModule }                        from '@angular/material/toolbar';
import { MatIconModule }                           from '@angular/material/icon';
import { MatCardModule }                           from '@angular/material/card';
import { MatExpansionModule }                      from '@angular/material/expansion';
import { MatChipsModule }                          from '@angular/material/chips';
import { MatButtonModule }                         from '@angular/material/button';
import { MatDividerModule }                        from '@angular/material/divider';
import { MatProgressSpinnerModule }                from '@angular/material/progress-spinner';

import { Recommendation, RecommendationService }   from '../../services/recommendations.service';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [
    CommonModule,                // NgIf, NgFor, DatePipe
    FormsModule,                 // ngModel

    MatChipsModule,
    MatToolbarModule,            // <mat-toolbar>
    MatIconModule,               // <mat-icon>
    MatCardModule,               // <mat-card>
    MatExpansionModule,          // <mat-accordion>, <mat-expansion-panel>, <mat-expansion-panel-header>
    MatChipsModule,              // <mat-chip-list>, <mat-chip>
    MatButtonModule,             // mat-button, mat-stroked-button, etc.
    MatDividerModule,            // <mat-divider>
    MatProgressSpinnerModule,
    MatFormField,
    MatInput,
    MatLabel
    // <mat-spinner>
  ],
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  recommendations: Recommendation[] = [];
  loading = false;
  newMessage = '';

  constructor(private recSvc: RecommendationService) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.loading = true;
    const userId = Number(localStorage.getItem('userId'));
    this.recSvc.getByUserId(userId).subscribe({
      next: data => {
        this.recommendations = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  send(): void {
    const userId = Number(localStorage.getItem('userId'));
    if (!this.newMessage.trim() || !userId) return;

    const payload: Partial<Recommendation> = {
      userId: userId,
      nutritionistId: 1, // Asignar un ID de nutricionista predeterminado
      message: this.newMessage.trim(),
      answer: '',
      type: 'QUESTION',
      status: 'PENDING',
      timestamp: new Date().toISOString()
    };

    this.recSvc.create(payload).subscribe({
      next: () => {
        this.newMessage = '';
        this.fetch();
      },
      error: err => console.error('Error al enviar recomendación', err)
    });
  }
}
