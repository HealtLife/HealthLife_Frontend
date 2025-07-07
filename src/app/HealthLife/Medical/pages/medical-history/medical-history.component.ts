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
  // ——— Variables principales ———
  dni: string = '';
  personalInfo!: PersonalInfo;
  weightHeight: WeightHeight[] = [];
  vaccines: Vaccine[] = [];
  prescriptions: Prescription[] = [];
  medicalNotes: MedicalNote[] = [];
  allergies: Allergy[] = [];
  reports: Report[] = [];

  // ——— IMC ———
  imcWeight: number = 0;
  imcHeight: number = 0;
  calculatedImc: number | null = null;

  // ——— Formulario de reportes ———
  reportForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private svc: MedicalHistoryService,
    private reportSvc: ReportService
  ) {
    // Inicializa el form de reportes
    this.reportForm = this.fb.group({
      titulo: [''],
      info: [false],
      weightHeight: [false],
      vaccine: [false],
      prescription: [false],
      notes: [false],
      allergies: [false]
    });
  }

  ngOnInit(): void {
    // 1) Cargo el DNI desde localStorage
    this.dni = localStorage.getItem('miDniPersonalizado') || '';
    if (!this.dni) {
      console.warn('No hay DNI configurado en localStorage');
      return;
    }

    // 2) Consultas al backend
    this.svc.getPersonalInfo(this.dni)
      .subscribe({
        next: pi => this.personalInfo = pi,
        error: err => console.error('Error personalInfo', err)
      });

    this.svc.getWeightHeight(this.dni)
      .subscribe({
        next: w => this.weightHeight = w,
        error: err => console.error('Error peso/altura', err)
      });

    this.svc.getVaccines(this.dni)
      .subscribe({
        next: v => this.vaccines = v,
        error: err => console.error('Error vacunas', err)
      });

    this.svc.getPrescriptions(this.dni)
      .subscribe({
        next: p => this.prescriptions = p,
        error: err => console.error('Error prescripciones', err)
      });

    this.svc.getMedicalNotes(this.dni)
      .subscribe({
        next: n => this.medicalNotes = n,
        error: err => console.error('Error notas médicas', err)
      });

    this.svc.getAllergies(this.dni)
      .subscribe({
        next: a => this.allergies = a,
        error: err => console.error('Error alergias', err)
      });

    // 3) Cargo también los reportes ya generados
    this.loadReports();
  }

  private loadReports(): void {
    this.reportSvc.listByUser(this.dni)
      .subscribe({
        next: r => this.reports = r,
        error: err => console.error('Error reportes', err)
      });
  }

  /** Genera un nuevo reporte */
  onGenerate(): void {
    const req: ReportRequest = {
      userDni: this.dni,
      ...this.reportForm.value
    };
    this.reportSvc.create(req)
      .subscribe({
        next: () => this.loadReports(),
        error: err => console.error('Error al generar reporte', err)
      });
  }


  /** Descarga el blob PDF que venga del servidor */
  onDownload(r: Report): void {
    // r.url es el filename que el endpoint espera
    this.reportSvc.download(r.url)
      .subscribe({
        next: blob => {
          const url = window.URL.createObjectURL(blob);
          const a   = document.createElement('a');
          a.href    = url;
          a.download = r.url;
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: err => console.error('Error al descargar reporte', err)
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
