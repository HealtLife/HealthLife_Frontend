import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import {ReactiveFormsModule, FormBuilder, FormGroup, FormsModule} from '@angular/forms';
import { MatCardModule }     from '@angular/material/card';
import { MatListModule }     from '@angular/material/list';
import { MatFormFieldModule }from '@angular/material/form-field';
import { MatInputModule }    from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule }   from '@angular/material/button';
import { MatIconModule }     from '@angular/material/icon';

import {
  MedicalHistoryService,
  PersonalInfo,
  WeightHeight,
  Vaccine,
  Prescription,
  MedicalNote,
  Allergy
} from '../../services/medical-history.service';
import { ReportService, Report, ReportRequest } from '../../services/report.service';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-medical-history',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    FormsModule
  ],
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit {
  dni = localStorage.getItem('userDni') || '';

  personalInfo?: PersonalInfo;
  weightHeight: WeightHeight[] = [];
  vaccines: Vaccine[] = [];
  prescriptions: Prescription[] = [];
  medicalNotes: MedicalNote[] = [];
  allergies: Allergy[] = [];

  reportForm: FormGroup;
  reports: Report[] = [];

  // Campos para IMC
  imcWeight: number = 0;
  imcHeight: number = 0; // en centímetros
  calculatedImc: number | null = null;

  constructor(
    private svc: MedicalHistoryService,
    private reportSvc: ReportService,
    private fb: FormBuilder
  ) {
    this.reportForm = this.fb.group({
      titulo:       ['Historial ' + this.dni],
      info:         [true],
      weightHeight: [true],
      vaccine:      [true],
      prescription: [true],
      notes:        [true],
      allergies:    [true]
    });
  }

  ngOnInit(): void {
    // Carga de datos
    this.svc.getPersonalInfo(this.dni).subscribe(pi => this.personalInfo = pi);
    this.svc.getWeightHeight(this.dni).subscribe(w => this.weightHeight = w);
    this.svc.getVaccines(this.dni).subscribe(v => this.vaccines = v);
    this.svc.getPrescriptions(this.dni).subscribe(p => this.prescriptions = p);
    this.svc.getMedicalNotes(this.dni).subscribe(n => this.medicalNotes = n);
    this.svc.getAllergies(this.dni).subscribe(a => this.allergies = a);
    this.loadReports();
  }

  private loadReports(): void {
    this.reportSvc.listByUser(this.dni).subscribe(r => this.reports = r);
  }

  onGenerate(): void {
    const req: ReportRequest = { userDni: this.dni, ...this.reportForm.value };
    this.reportSvc.create(req).subscribe(() => this.loadReports());
  }

  onDownload(r: Report): void {
    this.reportSvc.download(r.url).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a   = document.createElement('a');
      a.href    = url;
      a.download = r.url;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  /** Calcula el IMC: kg / (m * m) */
  calculateImc(): void {
    if (this.imcHeight > 0) {
      const heightMeters = this.imcHeight / 100;
      this.calculatedImc = this.imcWeight / (heightMeters * heightMeters);
    } else {
      this.calculatedImc = null;
    }
  }
}
