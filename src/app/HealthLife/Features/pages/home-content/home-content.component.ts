import {Component, OnInit} from '@angular/core';
import {User} from '../../../../shared/model/User/user.entity';
import {NgForOf, NgIf} from '@angular/common';
import {AuthenApiService} from '../../../Access/services/authen-api.service';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {DashboardService} from '../../services/dashboard.service';
import {TranslateModule} from '@ngx-translate/core';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatProgressBar} from '@angular/material/progress-bar';
import {EditGoalDialogComponent} from '../../components/edit-goal-dialog/edit-goal-dialog.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-home-content',
  standalone: true,
    imports: [
        MatNativeDateModule,
        EditGoalDialogComponent,
        MatDialogModule,
        NgIf,
        MatProgressSpinner,
        TranslateModule,
        MatButton,
        MatInput,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatCard,
        MatCardHeader,
        MatCardContent,
        MatProgressBar,
        NgForOf,
    ],
  templateUrl: './home-content.component.html',
  styleUrl: './home-content.component.css'
})
export class HomeContentComponent implements OnInit {

  public hydrationForm: FormGroup;
  public sleepForm: FormGroup;

  progress_hyd = 0;
  progress_sleep = 0;

  GOAL_HYDRATION: number = 2500;
  GOAL_SLEEP: number = 8;

  currentUser: User | null = null;
  user_id: number | undefined = 0;
  latestHydrationData: any | null = null;
  latestSleepData: any | null = null;

  goal: any = null;
  selectedGoal: any = null;

  achievement: any[] = [];
  addingNewAchievement: boolean = false;
  newAchievementForm: FormGroup;

  constructor(private authenService: AuthenApiService, private dashboardService: DashboardService, private dialog: MatDialog, public fb:FormBuilder) {
    this.hydrationForm = this.fb.group({
      ml: [null, [Validators.required, Validators.min(0)]]
    });

    this.sleepForm = this.fb.group({
      hours: [null, [Validators.required, Validators.min(0)]],
      quality: ['', Validators.required]
    });

    this.newAchievementForm = this.fb.group({
      date: ['', Validators.required],
      achievement: ['', Validators.required]
    });

  }

  ngOnInit(): void {

    this.authenService.getCurrentUser().subscribe(
      (user) => {
        this.currentUser = user;
        this.user_id = user?.id;
        console.log('Usuario autenticado en Home:', this.currentUser);
        this.refreshData();
      },
      error => {
        console.error('Error fetching current user:', error);
      }
    );

    console.log(this.user_id);
    this.dashboardService.getGoal(this.user_id).subscribe(goalData => {
      this.goal = goalData;
        console.log("sklsks");
        console.log(this.goal);
    }, error => {
      console.error('error loading goal:', error);

      }
    );

    this.loadAchievements();

  }


  addNewAchievement() {
    if (this.newAchievementForm.valid && this.currentUser) {
      const newAchievement = {
        userId: this.currentUser.id,
        ...this.newAchievementForm.value

      };

      this.dashboardService.addAchievement(newAchievement).subscribe(
        (record) => {
          this.achievement.push(record);
          this.addingNewAchievement = false;
          this.newAchievementForm.reset();
        },
        (error) => console.error("Error adding record", error)
      );
    }
  }

  private loadAchievements() {
    this.dashboardService.getAchievement(this.currentUser?.id).subscribe(ach => {
      this.achievement = ach;
    });
  }

  deleteAchievement(recordId: number) {
    this.dashboardService.deleteAchievement(recordId).subscribe(() => {
      this.loadAchievements();
    });
  }

  refreshData():void {
    this.getLatestHydrationForLast24Hours();
    this.getLatestSleepForLast24Hours()
  }

  openEditGoalModal(): void {
    if (this.goal) {

      this.selectedGoal = { ...this.goal };


      const dialogRef = this.dialog.open(EditGoalDialogComponent, {
        width: '400px',
        data: { ...this.selectedGoal }
      });


      dialogRef.afterClosed().subscribe(result => {
        if (result) {

          result.start_date = this.formatDate(result.start_date);
          result.end_date = this.formatDate(result.end_date);

          this.goal = result;
          const data = {
            id:0,
            user_id: this.user_id,
            goal_type: this.goal.goal_type,
            start_date: this.goal.start_date,
            end_date: this.goal.end_date
          };

          this.dashboardService.updateGoal(this.goal.id, data).subscribe(
            updatedGoal => {
              console.log('Meta actualizada:', updatedGoal);
              this.goal = updatedGoal;
            },
            error => {
              console.error('Error al actualizar la meta:', error);
            }
          );
        }
      });
    }
  }


  private formatDate(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  private getLatestSleepForLast24Hours(): void {

    if (this.user_id) {

      this.dashboardService.getLatestSleepLast24Hours(this.user_id).subscribe(
        totalHoursSlept => {

          if (totalHoursSlept !== null && totalHoursSlept !== undefined) {
            this.latestSleepData = totalHoursSlept;

            this.progress_sleep = (this.latestSleepData * 100) / this.GOAL_SLEEP;
          } else {
            console.warn("No se obtuvieron datos recientes de sueño en las últimas 24 horas.");
            this.progress_sleep = 0;
          }
        },
        error => {
          console.error('Error al obtener datos de sueño:', error);
          this.progress_sleep = 0;
        }
      );
    } else {
      console.warn('user_id es nulo o indefinido');
    }
  }



  private getLatestHydrationForLast24Hours(): void {
    if (this.user_id) {
      this.dashboardService.getLatestHydrationLast24Hours(this.user_id).subscribe(
        totalMl => {
          if (totalMl !== null && totalMl !== undefined) {
            this.latestHydrationData = totalMl;
            this.progress_hyd = this.latestHydrationData * 100 / this.GOAL_HYDRATION;
          } else {
            console.warn("No se obtuvieron datos recientes de hidratación en las últimas 24 horas.");
            this.progress_hyd = 0;
          }
        },
        error => {
          console.error('Error fetching hydration data:', error);
          this.progress_hyd = 0;
        }
      );
    } else {
      this.progress_hyd = 0;
      console.warn('user_id is null or undefined');
    }

  }

  openModalSleep():void {
    console.log('openModalSleep');
    if (this.sleepForm.valid) {
      const { hours, quality } = this.sleepForm.value;
      this.dashboardService.updateHours(this.user_id, hours, quality).subscribe(
        response => {
          this.getLatestSleepForLast24Hours();
          console.log('Sleep record saved successfully:', response);
          this.sleepForm.reset();
        },
        error => console.error('Error saving sleep record:', error)
      );
    }
  }

  openModal(): void {
    if (this.hydrationForm.valid) {
      const mlConsumed = this.hydrationForm.value.ml;
      this.dashboardService.updateHydration(this.user_id, mlConsumed).subscribe(
        response => {
          console.log('Hydration record saved successfully:', response);
          this.getLatestHydrationForLast24Hours();
          this.hydrationForm.reset();
        },
        error => console.error('Error saving hydration record:', error)
      );
    }

  }
}
