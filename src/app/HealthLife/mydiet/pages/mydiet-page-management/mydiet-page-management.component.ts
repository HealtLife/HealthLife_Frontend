import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {Food} from "../../model/food.entity";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {FoodService} from "../../services/food.service";
import {NgClass} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MydietPageComponent} from "../../mydiet-page/mydiet-page.component";
import {ToolbarComponent} from "../../../../public/components/toolbar/toolbar.component";
import {TranslateModule} from '@ngx-translate/core';
import {AuthenApiService} from '../../../Access/services/authen-api.service';


@Component({
  selector: 'app-mydiet-management',
  standalone: true,
  imports: [
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatSortHeader,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    NgClass,
    MatRow,
    MatIcon,
    MatPaginator,
    MydietPageComponent,
    ToolbarComponent,
    TranslateModule
  ],
  templateUrl: './mydiet-page-management.component.html',
  styleUrl: './mydiet-page-management.component.css'
})

export class MydietManagementComponent implements OnInit, AfterViewInit {
  protected mydietData!: Food;
  protected columnsToDisplay: string[] = [
    'id',
    'name',
    'calories',
    'proteins',
    'carbs',
    'fats',
  ];
  protected editMode: boolean = false;
  protected dataSource!: MatTableDataSource<Food>;

  protected dailyStats = {
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0
  };

  @ViewChild(MatPaginator, { static: false }) protected paginator!: MatPaginator;
  @ViewChild(MatSort) protected sort!: MatSort;

  currentUser: any = null;
  private foodService: FoodService = inject(FoodService);

  constructor(private authenService: AuthenApiService) {
    this.editMode = false;
    this.mydietData = new Food({});
    this.dataSource = new MatTableDataSource<Food>();

    this.authenService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
    this.getAllMydiets(this.currentUser.id);

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private calculateDailyStats(): void {
    let totalCalories = 0;
    let totalProteins = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    this.dataSource.data.forEach((food: Food) => {
      totalCalories += food.calories ?? 0;
      totalProteins += food.proteins ?? 0;
      totalCarbs += food.carbs ?? 0;
      totalFats += food.fats ?? 0;
    });

    this.dailyStats.calories = totalCalories;
    this.dailyStats.proteins = totalProteins;
    this.dailyStats.carbs = totalCarbs;
    this.dailyStats.fats = totalFats;
  }


  /*
  protected onDeleteItem(item: Food) {
    this.deleteMydiet(item.id);
  }*/

  protected onCancelRequested() {
    this.resetEditState();
    this.getAllMydiets(this.currentUser.id);
  }

  private resetEditState(): void {
    this.mydietData = new Food({});
    this.editMode = false;
  }

  protected onEditItem(item: Food) {
    this.editMode = true;
    this.mydietData = item;
  }

  protected onMydietsUpdateRequested(item: Food) {
    this.mydietData = item;
    //this.updateMydiets();
    this.resetEditState();
  }

  protected onMydietsAddRequested(item: Food) {
    this.mydietData = item;
    this.createMydiets();
    this.resetEditState();
  }

  private getAllMydiets(userId: number) {
    this.foodService.getAll(this.foodService.endpoint).subscribe((response: Array<Food>) => {
      this.dataSource.data = response.filter(food => food.userId === userId);
      this.calculateDailyStats();

    });
  }



  /*
  private deleteMydiet(id: number) {
    this.foodService.delete(this.foodService.endpoint, id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((mydiet: Food) => mydiet.id !== id);
      this.calculateDailyStats();
    });
  }
  */


  private createMydiets() {

    this.mydietData.calories = Number(this.mydietData.calories);
    this.mydietData.proteins = Number(this.mydietData.proteins);
    this.mydietData.carbs = Number(this.mydietData.carbs);
    this.mydietData.fats = Number(this.mydietData.fats);
    this.mydietData.userId = Number(this.currentUser.id);

    console.log(this.mydietData);

    this.foodService.create(this.foodService.endpoint, this.mydietData).subscribe((response: Food) => {
      this.dataSource.data.push(response);
      this.dataSource.data = [...this.dataSource.data];
      this.calculateDailyStats();
    });
  }


  /*
  private updateMydiets() {
    this.foodService.update(this.foodService.endpoint, this.mydietData?.id, this.mydietData).subscribe((response: Food) => {
      const index = this.dataSource.data.findIndex((mydiet: Food) => mydiet.id === response.id);
      this.dataSource.data[index] = response;
      this.dataSource.data = [...this.dataSource.data];
      this.calculateDailyStats();
    });
  }
  */

}
