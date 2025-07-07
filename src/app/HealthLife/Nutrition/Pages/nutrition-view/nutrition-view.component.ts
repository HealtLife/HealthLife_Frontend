// src/app/Nutrition/Pages/nutrition-view/nutrition-view.component.ts

import { Component, OnInit }               from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonModule }                    from '@angular/common';
import { ReactiveFormsModule }             from '@angular/forms';
import { MatCardModule }                   from '@angular/material/card';
import { MatInputModule }                  from '@angular/material/input';
import { MatButtonModule }                 from '@angular/material/button';
import { MatIconModule }                   from '@angular/material/icon';

import { NutritionService }                from '../../services/nutrition.service';

import * as Models from '../../Model/nutrition.model';
import {MatToolbar} from '@angular/material/toolbar';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-nutrition-view',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbar,
    MatOption,
    MatSelect,
    RouterLink
  ],
  templateUrl: './nutrition-view.component.html',
  styleUrls: ['./nutrition-view.component.css']
})
export class NutritionViewComponent implements OnInit {
  form!: FormGroup;
  showAllergies = false; // 👈 solución al error
  showWeightHeight = false; // 👈 para mostrar/ocultar peso/altura
  showVaccines = false; // 👈 para mostrar/ocultar vacunas
  showPrescriptions = false; // 👈 para mostrar/ocultar prescripciones
  showMedicalNotes = false; // 👈 para mostrar/ocultar notas médicas

  // catálogos para selects si los necesitas
  muscles: Models.Muscle[] = [];
  exercises: Models.Exercise[] = [];
  equipments: Models.Equipment[] = [];

  constructor(
    private fb: FormBuilder,
    private svc: NutritionService
  ) {
  }

  ngOnInit(): void {
    const dni = localStorage.getItem('userDni')!;
    const name = localStorage.getItem('userName') || 'Usuario';
    const lastname = localStorage.getItem('userLastname') || 'Desconocido';
    console.log('DNI cargado desde localStorage:', dni);
    console.log('Nombre cargado desde localStorage:', name);
    console.log('Apellido cargado desde localStorage:', lastname);
    // 1) Inicializa el FormGroup
    this.form = this.fb.group({
      personalInfo: this.fb.group({
        dni:             [dni, Validators.required],
        nombre:          [name, Validators.required],
        apellido:        [lastname, Validators.required],
        fechaNacimiento: ["", Validators.required],
        genero:          ["", Validators.required],
        tipoCuerpo:      [""],
        imc:             [""],
        userId:          [Number(localStorage.getItem('userId')) || null, Validators.required]
      }),
      allergies:      this.fb.array([]),
      weightHeight:   this.fb.array([]),
      vaccines:       this.fb.array([]),
      prescriptions:  this.fb.array([]),
      medicalNotes:   this.fb.array([])
    });

    // 2) Carga y mapea PersonalInfo (una sola vez)
    this.svc.getPersonalInfo(dni).subscribe({
      next: pi => {
        console.log('✅ Personal Info recibida:', pi); // 👈 aquí verás "Mesomorfo" y más
        this.form.get('personalInfo')!.patchValue(pi);
      },
      error: err => console.error('Error cargando info personal', err)
    });


    
    if(this.showAllergies) {
      this.svc.getAllergies(dni).subscribe({
        next: list => this.setFormArray('allergies', list),
        error: err => console.error('Error cargando alergias', err)
      });
    }
    
    if(this.showWeightHeight) {
      this.svc.getWeightHeights(dni).subscribe({
        next: list => this.setFormArray('weightHeight', list),
        error: err => console.error('Error cargando peso/altura', err)
      });
    } 

    if(this.showVaccines) {
      this.svc.getVaccines(dni).subscribe({
        next: list => this.setFormArray('vaccines', list),
        error: err => console.error('Error cargando vacunas', err)
      });
    } 

    if(this.showPrescriptions) {
      this.svc.getPrescriptions(dni).subscribe({
        next: list => this.setFormArray('prescriptions', list),
        error: err => console.error('Error cargando prescripciones', err)
      });
    }
    
    if(this.showMedicalNotes) {
      this.svc.getMedicalNotes(dni).subscribe({
        next: list => this.setFormArray('medicalNotes', list),
        error: err => console.error('Error cargando notas médicas', err)
      });
    }

    

    /*// 3) Cargar catálogos de fitness (para selects, si procede)
    this.svc.getMuscles().subscribe({
      next: m => this.muscles = m,
      error: err => console.error('Error cargando músculos', err)
    });
    this.svc.getExercises().subscribe({
      next: e => this.exercises = e,
      error: err => console.error('Error cargando ejercicios', err)
    });
    this.svc.getEquipments().subscribe({
      next: eq => this.equipments = eq,
      error: err => console.error('Error cargando equipamientos', err)
    });*/
  }


  /** Helper para poblar un FormArray a partir de un array de objetos */
  private setFormArray(key: string, items: any[]): void {
    const fa = this.form.get(key) as FormArray;
    fa.clear();
    items.forEach(item => fa.push(this.fb.group(item)));
  }

  // ── Alergias ─────────────────────────────────────────────────────────
  get allergies(): FormArray {
    return this.form.get('allergies') as FormArray;
  }

  toggleAllergies(): void {
    const dni = this.form.get('personalInfo')!.value.dni;
    if (!this.showAllergies) {
      this.svc.getAllergies(dni).subscribe({
        next: list => {
          this.setFormArray('allergies', list);
          // Si no hay alergias, añade una por defecto para evitar errores
          if (this.allergies.length === 0) {
            this.addAllergy();
          }
          this.showAllergies = true;
        },
        error: err => {
          console.error('Error cargando alergias', err);
          this.showAllergies = true;
        }
      });
    } else {
      this.showAllergies = false;
    }
  }
  toggleWeightHeight(): void {
    const dni = this.form.get('personalInfo')!.value.dni;
    if (!this.showWeightHeight) {
      this.svc.getWeightHeights(dni).subscribe({
        next: list => {
          this.setFormArray('weightHeight', list);
          // Si no hay entradas, añade una por defecto
          if (this.weightHeight.length === 0) {
            this.addWeightEntry();
          }
          this.showWeightHeight = true;
        },
        error: err => {
          console.error('Error cargando peso/altura', err);
          this.showWeightHeight = true;
        }
      });
    } else {
      this.showWeightHeight = false;
    }
  }


  togglePrescriptions(): void {
    const dni = this.form.get('personalInfo')!.value.dni;
    if (!this.showPrescriptions) {
      this.svc.getPrescriptions(dni).subscribe({
        next: list => {
          this.setFormArray('prescriptions', list);
          // Si no hay entradas, añade una por defecto
          if (this.prescriptions.length === 0) {
            this.addPrescription();
          }
          this.showPrescriptions = true;
        },
        error: err => {
          console.error('Error cargando prescripciones', err);
          this.showPrescriptions = true;
        }
      });
    } else {
      this.showPrescriptions = false;
    }
  }

  
  addAllergy(): void {
    const dni = this.form.get('personalInfo')!.value.dni;
    this.allergies.push(this.fb.group({
      dni: [dni],
      alergia: ['', Validators.required],
      reaccion: ['', Validators.required]
    }));
  }

  saveAllergies(): void {
    this.allergies.controls.forEach(ctrl => {
      const a = ctrl.value as Models.Allergy;
      this.svc.createAllergy(a).subscribe();
    });
  }

  // ── Peso & Altura ────────────────────────────────────────────────────
  get weightHeight(): FormArray {
    return this.form.get('weightHeight') as FormArray;
  }

  addWeightEntry(): void {
    const dni = this.form.get('personalInfo')!.value.dni;
    this.weightHeight.push(this.fb.group({
      dni: [dni],
      peso: [null, Validators.required],
      altura: [null, Validators.required],
      fecha_registro: [new Date().toISOString().substr(0, 10), Validators.required]
    }));
  }

  saveWeight(): void {
    this.weightHeight.controls.forEach(ctrl => {
      const wh = ctrl.value as Models.WeightHeight;
      this.svc.createWeightHeight(wh).subscribe();
    });
  }


  // ── Vacunas ─────────────────────────────────────────────────────────

  toggleVaccines(): void {
    const dni = this.form.get('personalInfo')!.value.dni;
    if (!this.showVaccines) {
      this.svc.getVaccines(dni).subscribe({
        next: list => {
          this.setFormArray('vaccines', list);
          if (this.vaccines.length === 0) {
            this.addVaccine();
          }
          this.showVaccines = true;
        },
        error: err => {
          console.error('Error cargando vacunas', err);
          this.showVaccines = true;
        }
      });
    } else {
      this.showVaccines = false;
    }
  }

  get vaccines(): FormArray {
    return this.form.get('vaccines') as FormArray;
  }


  addVaccine(): void {
    const dni = this.form.get('personalInfo')!.value.dni;
    this.vaccines.push(this.fb.group({
      dni: [dni],
      vacuna: ['', Validators.required],
      fechaAplicacion: ['', Validators.required],
      dosis: ['', Validators.required]
    }));
  }


  saveVaccines(): void {
    this.vaccines.controls.forEach(ctrl => {
      const v = ctrl.value as Models.Vaccine;
      this.svc.createVaccine(v).subscribe({
        next: () => console.log("Vacuna guardada", v),
        error: err => console.error("Error al guardar vacuna", err)
      });
    });
  }


  // ── Prescripciones ───────────────────────────────────────────────────
  get prescriptions(): FormArray {
    return this.form.get('prescriptions') as FormArray;
  }

  addPrescription(): void {
    const dni = this.form.get('personalInfo')!.value.dni;
    this.prescriptions.push(this.fb.group({
      dni: [dni],
      prescripcion: ['', Validators.required],
      dosage: ['', Validators.required],
      fecha_receta: ['', Validators.required],
      medico: ['Médico predeterminado']  // Puedes setearlo dinámicamente si tienes login
    }));

  }

  savePrescriptions(): void {
    this.prescriptions.controls.forEach(ctrl => {
      const p = ctrl.value as Models.Prescription;
      this.svc.createPrescription(p).subscribe();
    });
  }

  // ── Notas Médicas ────────────────────────────────────────────────────


  get medicalNotes(): FormArray {
      return this.form.get('medicalNotes') as FormArray;
    }
  toggleMedicalNotes(): void {
  const dni = this.form.get('personalInfo')!.value.dni;
  if (!this.showMedicalNotes) {
    this.svc.getMedicalNotes(dni).subscribe({
      next: list => {
        this.setFormArray('medicalNotes', list);
        if (this.medicalNotes.length === 0) {
          this.addMedicalNote();
        }
        this.showMedicalNotes = true;
      },
      error: err => {
        console.error('Error cargando notas médicas', err);
        this.showMedicalNotes = true;
      }
    });
  } else {
    this.showMedicalNotes = false;
  }
}

  

  addMedicalNote(): void {
  const dni = this.form.get('personalInfo')!.value.dni;
  this.medicalNotes.push(this.fb.group({
    dni: [dni],
    notes: ['', Validators.required],
    fecha_nota: ['', Validators.required],
    autor: ['']
  }));
}


  saveMedicalNotes(): void {
  this.medicalNotes.controls.forEach(ctrl => {
    const nota = ctrl.value as Models.MedicalNote;
    this.svc.createMedicalNote(nota).subscribe();
  });
}


  /** Crea un nuevo registro de PersonalInfo */
  createPersonalInfo(): void {
    const payload = this.form.get('personalInfo')!.value;
    console.log('Payload creación:', payload);
    this.svc.createPersonalInfo(payload).subscribe({
      next: created => console.log('Personal info creada', created),
      error: err => console.error('Error al crear personal info', err)
    });
  }

  /** Actualiza el registro existente de PersonalInfo */
  savePersonalInfo(): void {
    const payload = this.form.get('personalInfo')!.value;
    this.svc.updatePersonalInfo(payload.dni, payload).subscribe({
      next: updated => console.log('Personal info actualizada', updated),
      error: err => console.error('Error al actualizar personal info', err)
    });
    localStorage.setItem('userDni', String(payload.dni));
  }
}
