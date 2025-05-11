import { Component, OnInit, Inject, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [MatButton],
  templateUrl: './not-found.page.html',
  styleUrl: './not-found.page.css',
})
export class NotFoundPage implements OnInit {
  protected invalidUrl: string = '';
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  ngOnInit(): void {
    if (this.route.snapshot.url.length > 0) {
      this.invalidUrl = this.route.snapshot.url.map(segment => segment.path).join('/');
    } else {
      console.error('No se pudo obtener la URL inválida');
    }
  }

  protected onNavigateHome() {
    this.router.navigate(['home']).then();
  }
}
