import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {NgClass, NgForOf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatPaginator} from '@angular/material/paginator';
import {Activities} from '../../models/activities.entity';
import {ActivitiesService} from '../../services/activities.service';
import {ActivitiesFormComponent} from '../activities-form/activities-form.component';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {RecommendationsComponent} from '../recommendations/recommendations.component';
import {TranslateModule} from '@ngx-translate/core';
import {AuthenApiService} from '../../../Access/services/authen-api.service';

@Component({
  selector: 'app-activities-page',
  standalone: true,
  imports: [
    MatTable,
    MatSort,
    NgClass,
    MatIcon,
    MatPaginator,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    ActivitiesFormComponent,
    MatCard,
    NgForOf,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    RecommendationsComponent,
    TranslateModule
  ],
  templateUrl: './activities-page.component.html',
  styleUrl: './activities-page.component.css'
})
export class ActivitiesPageComponent implements OnInit, AfterViewInit {
  protected activitiesData!: Activities;
  protected columnsToDisplay: string[] = [
    'id',
    'name',
    'description',
    'duration'
  ];
  protected editMode: boolean = false;
  protected dataSource!: MatTableDataSource<Activities>;

  @ViewChild(MatPaginator, { static: false }) protected paginator!: MatPaginator;
  @ViewChild(MatSort) protected sort!: MatSort;
  currentUser: any = null;

  private activitiesService: ActivitiesService = inject(ActivitiesService);

  constructor(private authenService: AuthenApiService) {
    this.editMode = false;
    this.activitiesData = new Activities({});
    this.dataSource = new MatTableDataSource<Activities>();

    this.authenService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });

  }

  ngOnInit(): void {
    this.getAllActivities(this.currentUser.id);

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  protected onDeleteItem(item: Activities) {
    this.deleteActivity(item.id);
  }

  protected onCancelRequested() {
    this.resetEditState();
    this.getAllActivities(this.currentUser.id);
  }

  private resetEditState(): void {
    this.activitiesData = new Activities({});
    this.editMode = false;
  }

  protected onEditItem(item: Activities) {
    this.editMode = true;
    this.activitiesData = item;
  }

  protected onActivitiesUpdateRequested(item: Activities) {
    this.activitiesData = item;
    this.updateActivities();
    this.resetEditState();
  }

  protected onActivitiesAddRequested(item: Activities) {
    this.activitiesData = item;
    this.createActivities();
    this.resetEditState();
  }

  private getAllActivities(userId: number) {

    this.activitiesService.getAll(this.activitiesService.endpoint).subscribe((response: Array<any>) => {
      this.dataSource.data = response.filter(activity => activity.userId === userId);

    });
  }

  private deleteActivity(id: number) {
    this.activitiesService.delete(this.activitiesService.endpoint, id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((activity: Activities) => activity.id !== id);
    });
  }

  private createActivities() {

    const newData = {
      name: this.activitiesData.name,
      description: this.activitiesData.description,
      duration: this.activitiesData.duration,
      userId: this.currentUser.id
    }

    this.activitiesService.create(this.activitiesService.endpoint, newData).subscribe((response: Activities) => {
      this.dataSource.data.push(response);
      this.dataSource.data = [...this.dataSource.data];
    });
  }

  private updateActivities() {
    this.activitiesService.update(this.activitiesService.endpoint, this.activitiesData.id, this.activitiesData).subscribe((response: Activities) => {
      const index = this.dataSource.data.findIndex((activity: Activities) => activity.id === response.id);
      this.dataSource.data[index] = response;
      this.dataSource.data = [...this.dataSource.data];
    });
  }


}
