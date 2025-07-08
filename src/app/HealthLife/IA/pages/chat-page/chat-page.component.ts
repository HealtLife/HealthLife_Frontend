import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';
import {NgClass, NgForOf} from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

interface Message {
  author: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    NgForOf
  ],
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements AfterViewInit {
  @ViewChild('messageList', { read: ElementRef })
  messageList!: ElementRef<HTMLElement>;

  inputControl = new FormControl('');
  messages: Message[] = [];

  constructor(private gemini: GeminiService) {}

  ngAfterViewInit(): void {
    this.pushMessage('bot', '¡Hola! ¿En qué puedo ayudarte hoy?');
  }

  send(): void {
    const userText = this.inputControl.value?.trim();
    if (!userText) return;

    // Mostramos lo que el usuario escribió
    this.pushMessage('user', userText);
    this.inputControl.setValue('');

    // Construimos el prompt completo con la instrucción de sistema
    const prompt = `
Recuerda: sólo puedes responder preguntas relacionadas con
1) Recomendaciones de dieta
2) Rutinas de ejercicio

Usuario pregunta: ${userText}
  `.trim();

    // Llamamos a Gemini con ese prompt enriquecido
    this.gemini.sendMessage(prompt).subscribe({
      next: (response: string) => this.pushMessage('bot', response),
      error: ()     => this.pushMessage('bot', 'Error al procesar tu mensaje.')
    });
  }


  private pushMessage(author: Message['author'], text: string) {
    this.messages.push({ author, text });
    if (this.messageList) {
      setTimeout(() => {
        const el = this.messageList.nativeElement;
        el.scrollTop = el.scrollHeight;
      });
    }
  }
}
