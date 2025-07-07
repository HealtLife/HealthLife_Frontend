// src/app/Nutrition/Model/Nutrition.model.ts

export interface Allergy {
  dni: string;
  alergia: string;
  reaccion: string;
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
  dni: string;
  fecha_nota: string;
  notes: string;
  autor: string;
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
  userId?:         number;
}


export interface Prescription {
  dni: string;
  prescripcion: string;
  
  fecha_receta: string;
  medico: string;
}

export interface Vaccine {
  dni: string;
  vacuna: string;
  fechaAplicacion: string;
  dosis: string;
}

export interface WeightHeight {
  dni: string;
  peso: number;
  altura: number;
  fechaRegistro: string;
}
