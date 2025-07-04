import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { User } from '../../../../shared/model/User/user.entity';
import { AuthenApiService } from '../../../Access/services/authen-api.service';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-analysis-content',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    TranslateModule,
    NgForOf
  ],
  templateUrl: './analysis-content.page.html',
  styleUrls: ['./analysis-content.page.css']
})
export class AnalysisContentPage implements OnInit {

  currentUser: User | null = null;
  editingRecord: any = null;
  editForm: FormGroup;

  healthForm: FormGroup;
  bmi: number | null = null;
  medicalHistory: any[] = [];
  addingNewRecord: boolean = false;
  newRecordForm: FormGroup;

  constructor(private dashboard: DashboardService, private fb: FormBuilder, private authenService: AuthenApiService) {
    this.healthForm = this.fb.group({
      height: ['', [Validators.required, Validators.min(1)]],
      weight: ['', [Validators.required, Validators.min(1)]],
      proteins: ['', [Validators.min(0)]],
      carbohydrates: ['', [Validators.min(0)]],
      fats: ['', [Validators.min(0)]]
    });

    this.editForm = this.fb.group({
      date: ['', Validators.required],
      condition: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.newRecordForm = this.fb.group({
      date: ['', Validators.required],
      condition: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authenService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (err) => {
        console.error('Failed to load user', err);
      },
    });

    this.loadMedicalHistory();
  }

  addNewRecord() {
    if (this.newRecordForm.valid && this.currentUser) {
      const newRecord = {
        ...this.newRecordForm.value,
        userId: this.currentUser.id
      };

      this.dashboard.addMedicalHistory(newRecord).subscribe(
        (record) => {
          this.medicalHistory.push(record);
          this.addingNewRecord = false;
          this.newRecordForm.reset();
        },
        (error) => console.error('Error adding record', error)
      );
    }
  }

  startEdit(record: any) {
    this.editingRecord = record;
    this.editForm.patchValue({
      date: record.date,
      condition: record.condition,
      description: record.description
    });
  }

  saveEdit() {
    if (this.editForm.valid && this.editingRecord) {
      const updatedRecord = {
        ...this.editingRecord,
        ...this.editForm.value
      };
      this.dashboard.updateMedicalHistory(updatedRecord).subscribe(() => {
        this.loadMedicalHistory();
        this.editingRecord = null;
      });
    }
  }

  calculateBMI() {
    const height = this.healthForm.value.height / 100;
    const weight = this.healthForm.value.weight;

    if (height > 0 && weight > 0) {
      this.bmi = weight / (height * height);
    }
  }

  private loadMedicalHistory() {
    this.dashboard.getMedicalHistory(this.currentUser?.id).subscribe(history => {
      this.medicalHistory = history;
    });
  }

  deleteRecord(recordId: number) {
    this.dashboard.deleteMedicalHistory(recordId).subscribe(() => {
      this.loadMedicalHistory();
    });
  }
}
