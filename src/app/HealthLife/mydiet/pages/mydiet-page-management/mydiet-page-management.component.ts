import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import { NgClass } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { AuthenApiService } from '../../../Access/services/authen-api.service';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import {MydietPageComponent} from '../../mydiet-page/mydiet-page.component';

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
    MatCard,
    MatCardTitle,
    MatCardContent,
    MydietPageComponent
  ],
  templateUrl: './mydiet-page-management.component.html',
  styleUrls: ['./mydiet-page-management.component.css']
})

export class MydietManagementComponent implements OnInit, AfterViewInit {
  protected columnsToDisplay: string[] = [
    'id',
    'name',
    'calories',
    'proteins',
    'carbs',
    'fats',
  ];
  protected editMode: boolean = false;
  protected dataSource!: MatTableDataSource<any>;  // Usamos "any" para datos genéricos

  protected dailyStats = {
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0
  };

  @ViewChild(MatPaginator, { static: false }) protected paginator!: MatPaginator;
  @ViewChild(MatSort) protected sort!: MatSort;

  currentUser: any = null;
  private authenService: AuthenApiService = inject(AuthenApiService);  // Inyectamos el servicio de autenticación

  constructor() {
    this.editMode = false;
    this.dataSource = new MatTableDataSource<any>();  // Usamos "any" para datos genéricos

    // Cargar datos del usuario al momento de iniciar
    this.authenService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
    // Obtiene los datos de la dieta del usuario
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

    this.dataSource.data.forEach((item: any) => {
      totalCalories += item.calories ?? 0;
      totalProteins += item.proteins ?? 0;
      totalCarbs += item.carbs ?? 0;
      totalFats += item.fats ?? 0;
    });

    this.dailyStats.calories = totalCalories;
    this.dailyStats.proteins = totalProteins;
    this.dailyStats.carbs = totalCarbs;
    this.dailyStats.fats = totalFats;
  }

  protected onCancelRequested() {
    this.resetEditState();
    this.getAllMydiets(this.currentUser.id);
  }

  private resetEditState(): void {
    this.editMode = false;
  }

  protected onEditItem(item: any) {
    this.editMode = true;
  }

  protected onMydietsUpdateRequested(item: any) {
    this.resetEditState();
  }

  protected onMydietsAddRequested(item: any) {
    this.createMydiets();
    this.resetEditState();
  }

  private getAllMydiets(userId: number) {
    // Aquí deberías reemplazar con el servicio adecuado para obtener los datos
    // Por ejemplo, llamando a un servicio que recupere datos de la dieta o historial
    // Este código es un ejemplo genérico, necesitarás actualizarlo según la lógica de tu aplicación
    this.authenService.getSubscription(userId).subscribe((response: any[]) => {
      this.dataSource.data = response.filter(item => item.userId === userId);
      this.calculateDailyStats();
    });
  }

  private createMydiets() {
    const newItem = {
      calories: Number(0),
      proteins: Number(0),
      carbs: Number(0),
      fats: Number(0),
      userId: Number(this.currentUser.id)
    };

    console.log(newItem);

    // Aquí deberías realizar la lógica para crear el nuevo ítem en la base de datos
    // Asegúrate de que el servicio correspondiente lo maneje correctamente
    this.authenService.registerSubscription(newItem).subscribe((response: any) => {
      this.dataSource.data.push(response);
      this.dataSource.data = [...this.dataSource.data];
      this.calculateDailyStats();
    });
  }
}
