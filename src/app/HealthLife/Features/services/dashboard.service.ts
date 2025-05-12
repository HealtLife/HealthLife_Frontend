import { Injectable } from '@angular/core';
import {BaseService} from '../../../shared/services/base.service';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private baseService: BaseService<any>) { }

  getAllHydration(userId: number | undefined): Observable<any[]> {
    return this.baseService.getAll('hydration').pipe(
      map(hydrations => {
        return hydrations.filter(hydration => hydration.userId === userId);
      })
    );
  }

  getAllSleep(_userId: number | undefined): Observable<any[]> {
    return this.baseService.getAll('sleep').pipe(
      map(sleep => {
        const a = sleep.filter(sleep => sleep.userId === _userId);
        return a;
      })
    );
  }

  getGoal(userId: number | undefined):Observable<any> {
    return this.baseService.getAll('goals').pipe(
      map(goal => {
        return goal.find(goal => goal.userId === userId);
      })
    )
  }

  updateGoal(id: number, goalData: any) {
    return this.baseService.update('goals', id, goalData);
  }

  getLatestSleepLast24Hours(userId: number | undefined): Observable<any> {
    return this.getAllSleep(userId).pipe(
      map(sleep => {


        if (!sleep || sleep.length === 0) {

          return null;
        }

        const now = new Date();
        const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const recentSleep = sleep.filter((sleep: { date: string | number | Date; }) =>
          new Date(sleep.date) >= last24Hours
        );


        if (recentSleep.length === 0) {

          return null;
        }

        const totalHoursSlept = recentSleep.reduce((total, current) => {
          const hours = current.hoursSlept || 0;

          return total + hours;
        }, 0);

        return totalHoursSlept;

      })
    );
  }


  getLatestHydrationLast24Hours(userId: number | undefined): Observable<any> {
    return this.getAllHydration(userId).pipe(
      map(hydrations => {
        if (!hydrations || hydrations.length === 0) {
          return null;
        }

        const now = new Date();
        const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const recentHydrations = hydrations.filter((hydration: { date: string | number | Date; }) =>
          new Date(hydration.date) >= last24Hours
        );

        if (recentHydrations.length === 0) {
          return null;
        }
        const totalmlDrink = recentHydrations.reduce((total, current) => {
          return total + (current.quantity_ml || 0);
        }, 0);



        return totalmlDrink;
      })
    );
  }

  updateHours(user_id: number | undefined, hours: number, quality: string): Observable<any> {

    const response = {
      userId: user_id,
      date: new Date().toISOString(),
      hoursSlept: hours,
      quality: quality
    }


    return this.baseService.create("sleep", response );

  }
  updateHydration(userId: number | undefined, quantity: number): Observable<any> {

    const response = {
      date: new Date().toISOString().split('T')[0],
      quantity_ml: quantity,
      userId: userId
    };


    return this.baseService.create("hydration", response );

  }

  getMedicalHistory(userId: number | undefined): Observable<any[]> {
    return this.baseService.getAll('medical-history').pipe(
      map((history: any[]) => {
        return history.filter(record => record.userId === userId);
      })
    );
  }

  updateMedicalHistory(record: any): Observable<any> {
    return this.baseService.update('medical-history', record.id, record);
  }

  deleteMedicalHistory(recordId: number): Observable<any> {

    return this.baseService.delete('medical-history', recordId);
  }

  addMedicalHistory(record: any): Observable<any> {
    return this.baseService.create('medical-history', record);
  }



  addAchievement(record: any): Observable<any>{
    return this.baseService.create('achievements', record);
  }

  getAchievement(userId: number | undefined): Observable<any[]> {
    return this.baseService.getAll('achievements').pipe(
      map((ach: any[]) => {
        return ach.filter(record => record.userId === userId);
      })
    );
  }

  deleteAchievement(recordId: number): Observable<any> {

    return this.baseService.delete('achievements', recordId);
  }

}
