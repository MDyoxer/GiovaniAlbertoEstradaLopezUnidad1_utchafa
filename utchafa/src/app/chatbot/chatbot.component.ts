import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  mensajes: { texto: string, tipo: 'usuario' | 'bot' }[] = [
    { texto: '¡Hola! ¿En qué puedo ayudarte?', tipo: 'bot' }
  ];
  mostrarOpciones: boolean = true;

  enviarMensaje(pregunta: string) {
    this.mensajes.push({ texto: pregunta, tipo: 'usuario' });
    this.mostrarOpciones = false;

    const respuesta = this.obtenerRespuesta(pregunta);

    setTimeout(() => {
      this.mensajes.push({ texto: respuesta, tipo: 'bot' });
      this.mostrarOpciones = true;
      setTimeout(() => this.scrollAlFinal(), 100);
    }, 500);
  }

  obtenerRespuesta(pregunta: string): string {
    switch (pregunta) {
      case '¿Para qué sirve esto?':
        return 'Esta sección te permite hablar con un asistente automático para resolver tus dudas.';
      case '¿Cómo agrego una tarea?':
        return 'Ve al menú "Crear Tareas" (➕) y llena el formulario con la materia, nombre y fecha.';
      case '¿Cómo busco una tarea?':
        return 'En la sección de Tareas 📋 usa el campo de búsqueda o los filtros de materia y fecha.';
     case '¿Cómo elimino una tarea?':
       return 'En cada tarea habra un icono de papelera, usalo para eliminar la tarea requerida.';
      default:
        return 'Lo siento, no entendí tu pregunta. Intenta con una opción del menú.';
    }
  }

  scrollAlFinal() {
    const chatContainer = document.querySelector('.chat-mensajes');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }
}
