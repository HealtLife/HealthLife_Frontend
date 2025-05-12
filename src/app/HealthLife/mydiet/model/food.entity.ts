export class Food {

  name: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  userId: number;

  constructor(food: {name?: string, calories?: number, proteins?: number, carbs?: number, fats?: number, user_id?: number}) {
    this.name = food.name ||"";
    this.calories = food.calories || 0;
    this.proteins = food.proteins || 0;
    this.carbs = food.carbs || 0;
    this.fats = food.fats || 0;
    this.userId = food.user_id || 0;
  }
}
