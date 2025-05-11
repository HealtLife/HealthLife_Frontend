import { Component } from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {TranslateService} from "@ngx-translate/core";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-switcher',
  standalone: true,
  imports: [
    MatButtonToggleGroup,
    MatButtonToggle,
    NgForOf
  ],
  templateUrl: './switcher.component.html',
  styleUrl: './switcher.component.css'
})
export class SwitcherComponent {
  currentLang = 'en';
  languages = ['en', 'es'];

  constructor(private translate: TranslateService) {
    this.currentLang = translate.currentLang;
  }

  useLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
