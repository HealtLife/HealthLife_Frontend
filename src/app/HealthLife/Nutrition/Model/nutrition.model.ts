// src/app/Nutrition/Model/Nutrition.model.ts

export interface Allergy {
  id?: number;
  name: string;
  severity: string;
}

export interface Equipment {
  id?: number;
  name: string;
}

export interface Exercise {
  id?: number;
  name: string;
  muscleGroup: string;
}

export interface MedicalNote {
  id?: number;
  note: string;
  date: string;
}

export interface Muscle {
  id?: number;
  name: string;
}

export interface PersonalInfo {
  dni:             string;
  fechaNacimiento: string;
  genero:          string;
  tipoCuerpo?:     string;
  imc?:            number;
}


export interface Prescription {
  id?: number;
  medication: string;
  dosage: string;
  frequency: string;
}

export interface Vaccine {
  id?: number;
  name: string;
  date: string;
}

export interface WeightHeight {
  id?: number;
  weightKg: number;
  heightCm: number;
  date: string;
}
