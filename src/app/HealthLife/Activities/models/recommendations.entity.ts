export class Recommendation {
  id: number;
  description: string;


  constructor(data: { id?: number;  description?: string;  }) {
    this.id = data.id || 0;
    this.description = data.description || '';

  }
}
