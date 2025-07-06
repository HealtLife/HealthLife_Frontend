export class Recommendation {
  id: number;

  userId: number;
  nutritionistId: number;
  message: string;
  answer: string;
  type: string;
  status: string;
  timestamp: string;
  


  constructor(
    id: number,
    userId: number,
    nutritionistId: number,
    message: string,
    answer: string,
    type: string,
    status: string,
    timestamp: string
  ) {
    this.id = id;
    this.userId = userId;
    this.nutritionistId = nutritionistId;
    this.message = message;
    this.answer = answer;
    this.type = type;
    this.status = status;
    this.timestamp = timestamp;
  }
}
