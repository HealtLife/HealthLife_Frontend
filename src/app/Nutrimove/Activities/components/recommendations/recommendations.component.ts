import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Recommendation} from '../../models/recommendations.entity';
import {ActivitiesService} from '../../services/activities.service';
import {NgForOf} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [
    NgForOf,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    TranslateModule
  ],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.css'
})
export class RecommendationsComponent implements OnInit {
  @ViewChild('recommendationsList', { static: false }) recommendationsList!: ElementRef;
  recommendations: Recommendation[] = [];

  constructor(private activitiesService: ActivitiesService) {}

  ngOnInit(): void {
    this.loadRecommendations();
  }

  private loadRecommendations() {
    this.activitiesService.getRecommendations().subscribe({
      next: (data: Recommendation[]) => {
        this.recommendations = data;
      },
      error: (err) => {
        console.error('Error fetching recommendations', err);
      }
    });
  }

  scrollLeft() {
    const scrollAmount = 300;
    this.recommendationsList.nativeElement.scrollBy({
      top: 0,
      left: -scrollAmount,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    const scrollAmount = 300;
    this.recommendationsList.nativeElement.scrollBy({
      top: 0,
      left: scrollAmount,
      behavior: 'smooth'
    });
  }


}
