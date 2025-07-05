import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { AuthenApiService } from '../../../Access/services/authen-api.service';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MydietPageComponent } from '../../mydiet-page/mydiet-page.component';

@Component({
  selector: 'app-mydiet-management',
  standalone: true,
  imports: [
    MatTable, MatSort, MatColumnDef, MatHeaderCell, MatHeaderCellDef,
    MatSortHeader, MatCell, MatCellDef, MatHeaderRow, MatHeaderRowDef,
    MatRowDef, NgClass, MatRow, MatIcon, MatPaginator,
    MatCard, MatCardTitle, MatCardContent, MydietPageComponent
  ],
  templateUrl: './mydiet-page-management.component.html',
  styleUrls: ['./mydiet-page-management.component.css']
})
export class MydietManagementComponent implements OnInit, AfterViewInit {
  protected columnsToDisplay: string[] = ['id','name','calories','proteins','carbs','fats'];
  protected editMode = false;
  protected dataSource = new MatTableDataSource<any>();
  protected dailyStats = { calories: 0, proteins: 0, carbs: 0, fats: 0 };

  @ViewChild(MatPaginator) protected paginator!: MatPaginator;
  @ViewChild(MatSort) protected sort!: MatSort;

  currentUser: any = null;
  private authenService = inject(AuthenApiService);

  constructor() {
    // Carga inicial de usuario
    this.authenService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      // Una vez tenemos el userId, cargamos las dietas
      this.getAllMydiets(this.currentUser.id);
    });
  }

  ngOnInit(): void { /* no hace falta cargar aquí de nuevo */ }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private calculateDailyStats(): void {
    const totals = this.dataSource.data.reduce((acc, item: any) => ({
      calories: acc.calories + (item.calories ?? 0),
      proteins: acc.proteins + (item.proteins ?? 0),
      carbs:    acc.carbs    + (item.carbs    ?? 0),
      fats:     acc.fats     + (item.fats     ?? 0)
    }), { calories:0, proteins:0, carbs:0, fats:0 });

    this.dailyStats = totals;
  }

  protected onCancelRequested() {
    this.editMode = false;
    this.getAllMydiets(this.currentUser.id);
  }

  protected onEditItem(item: any) {
    this.editMode = true;
  }

  protected onMydietsUpdateRequested(item: any) {
    this.editMode = false;
    // Lógica de actualización si fuera necesaria...
  }

  protected onMydietsAddRequested(item: any) {
    this.editMode = false;
    this.createMydiets();
  }

  /** Carga todas las “dietas” del usuario */
  private getAllMydiets(userId: number) {
    this.authenService.getSubscription(userId)
      .subscribe((response: any[]) => {
        this.dataSource.data = response.map(item => ({ ...item, userId }));
        this.calculateDailyStats();
      });
  }

  /** Crea una nueva entrada de dieta para el usuario */
  private createMydiets() {
    const dietData = { calories:0, proteins:0, carbs:0, fats:0 };

    this.authenService
      .registerSubscription(this.currentUser.id, dietData)
      .subscribe((response: any) => {
        this.dataSource.data = [
          ...this.dataSource.data,
          { ...response, userId: this.currentUser.id }
        ];
        this.calculateDailyStats();
      });
  }
}
