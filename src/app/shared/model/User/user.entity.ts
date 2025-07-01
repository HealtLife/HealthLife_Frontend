// src/app/shared/model/User/user.entity.ts

export class User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  created_at: string;
  privacy: string;
  suscription: string;

  constructor(
    id: number,
    name: string,
    lastname: string,
    email: string,
    password: string,
    created_at: string,
    privacy: string,
    suscription: string
  ) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.created_at = created_at;
    this.privacy = privacy;
    this.suscription = suscription;
  }
}
