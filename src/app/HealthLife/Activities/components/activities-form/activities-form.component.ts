import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient }                            from '@angular/common/http';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatInput} from '@angular/material/input';
import {MatCard} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {ActivitiesService, ActivityDto} from '../../services/activities.service';


@Component({
  selector: 'app-activities-form',
  templateUrl: './activities-form.component.html',
  standalone: true,
  imports: [
    MatError,
    MatButton,
    NgIf,
    MatLabel,
    MatInput,
    MatFormField,
    MatIconModule,
    ReactiveFormsModule,
    MatCard
  ],
  styleUrls: ['./activities-form.component.css']
})
export class ActivitiesFormComponent implements OnInit {
  @Output() created = new EventEmitter<void>();
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activitiesSvc: ActivitiesService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name:        ['', Validators.required],
      description: ['', Validators.required],
      duration:    [null, [Validators.required, Validators.min(1)]]
    });
  }

  submit(): void {
    if (this.form.invalid) return
      ;
    const userId = Number(localStorage.getItem('userId'));
    const newActivity: ActivityDto = {
      ...this.form.value,
      userId
    };

    this.activitiesSvc.create(newActivity).subscribe({
      next: () => {
        this.form.reset();
        this.created.emit();
      },
      error: err => console.error('Error al crear actividad', err)
    });
  }
}

