import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Plan {
  key: string;
  title: string;
  features: string[];
}

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  // Planes disponibles
  plans: Plan[] = [
    {
      key: 'regular',
      title: 'Regular',
      features: [
        'Acceso básico',
        'Soporte por email',
        'Limitaciones en servicios'
      ]
    },
    {
      key: 'premium',
      title: 'Premium',
      features: [
        'Funciones avanzadas',
        'Soporte prioritario',
      ]
    },
    {
      key: 'plus',
      title: 'Plus',
      features: [
        'Funciones avanzadas',
        'Soporte 24/7',
      ]
    }
  ];

  // Plan seleccionado
  selectedPlanKey: string | null = null;

  // Modelo para el formulario de pago
  payment = {
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

  constructor(private router: Router) { }

  ngOnInit(): void { }

  // Habilita el botón de actualización solo si hay un plan seleccionado
  isUpdateValid(): boolean {
    return this.selectedPlanKey !== null;
  }

  updateItem(): void {
    console.log('Plan seleccionado:', this.selectedPlanKey);
    // Aquí iría la llamada a un servicio para actualizar el plan en el backend
  }

  // Validación del formulario de pago
  isPaymentValid(): boolean {
    return !!this.payment.cardNumber
      && !!this.payment.expiryDate
      && !!this.payment.cvv;
  }

  processPayment(): void {
    console.log('Procesando pago:', this.payment, 'para plan', this.selectedPlanKey);
    // Aquí iría la integración real con tu API de pagos
  }

  // Navegar hacia atrás
  goBack(): void {
    this.router.navigate(['/profile/view']);
  }
}
