import { Component, OnInit } from '@angular/core';
import { RutinaApiService } from '../../services/rutina-api.service';
import {NgForOf} from '@angular/common';
import {MatCard} from '@angular/material/card';
import {MatCardModule} from '@angular/material/card';
import {TranslateModule} from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@Component({
  selector: 'app-rutina-list',
  templateUrl: './rutina-list.component.html',
  standalone: true,
  imports: [
    NgForOf,
    MatCard,
    MatCardModule,
    TranslateModule,
    MatFormFieldModule,
    FormsModule,
    MatInput,
    MatAutocompleteModule
  ],
  styleUrls: ['./rutina-list.component.css']
})
export class RutinaListComponent implements OnInit {
  rutinas: any[] = [];
  type_of_muscle: string = '';
  errorMessage: string = '';
  filteredMuscles: string[] = [];
  allMuscles: string[] = [
    'abdominals',
    'abductors',
    'adductors',
    'biceps',
    'calves',
    'chest',
    'forearms',
    'glutes',
    'hamstrings',
    'lats',
    'lower_back',
    'middle_back',
    'neck',
    'quadriceps',
    'traps',
    'triceps'
  ];

  constructor(private rutinaApiService: RutinaApiService) {}

  ngOnInit(): void {
    this.onSearch();
  }


  onSearch() {
    this.type_of_muscle = this.type_of_muscle.toLowerCase();

    if (this.type_of_muscle) {
      this.rutinaApiService.getExercises(this.type_of_muscle).subscribe(
        (data: any) => {
          this.rutinas = data;
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = 'Error al obtener rutinas';
          this.rutinas = [];
        }
      );
    } else {
      this.rutinas = [];
    }
  }

  filterMuscles() {
    const searchTerm = this.type_of_muscle.toLowerCase();
    this.filteredMuscles = this.allMuscles.filter(muscle =>
      muscle.toLowerCase().includes(searchTerm)
    );
  }
}
