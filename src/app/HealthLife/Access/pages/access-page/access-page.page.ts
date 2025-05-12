import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {LoginDialogComponent} from '../../components/login-dialog/login-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {RegisterDialogComponent} from '../../components/register-dialog/register-dialog.component';

@Component({
  selector: 'app-access-page',
  standalone: true,
  imports: [
    MatButton,
    MatToolbar
  ],
  templateUrl: './access-page.page.html',
  styleUrl: './access-page.page.css'
})
export class AccessPagePage {

}
