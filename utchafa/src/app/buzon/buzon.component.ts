import { Component } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buzon',
  standalone:true,
  templateUrl: './buzon.component.html',
  styleUrls: ['./buzon.component.css'],
  imports: [NavComponent,CommonModule]
})
export class BuzonComponent {
  messages = [
    {
      sender: 'Juan Pérez',
      subject: 'Re: Entrega del proyecto',
      preview: 'Hola, ¿ya revisaste los archivos que te envié...?',
      time: '10:30 AM',
      unread: true,
      important: false
    },
    {
      sender: 'Soporte Técnico',
      subject: 'Mantenimiento programado',
      preview: 'El sistema estará inactivo el próximo...',
      time: 'Ayer',
      unread: false,
      important: true
    },
    {
      sender: 'María López',
      subject: 'Invitación a reunión',
      preview: 'Por favor confirma tu asistencia a la reunión de mañana.',
      time: '9:15 AM',
      unread: true,
      important: true
    },
    {
      sender: 'Recursos Humanos',
      subject: 'Actualización de políticas',
      preview: 'Te compartimos las nuevas políticas internas para el próximo año.',
      time: '2 días atrás',
      unread: false,
      important: false
    },
    {
      sender: 'Carlos Sánchez',
      subject: 'Feedback del cliente',
      preview: 'El cliente quedó satisfecho con el trabajo entregado.',
      time: 'Ayer',
      unread: false,
      important: false
    }
  ];

  getIcon(sender: string): string {
    if (sender.toLowerCase().includes('soporte')) return '🛠️';
    if (sender.toLowerCase().includes('recursos')) return '📋';
    if (sender.toLowerCase().includes('juan')) return '👤';
    if (sender.toLowerCase().includes('maría')) return '📅';
    if (sender.toLowerCase().includes('carlos')) return '💬';
    return '📧';
  }
}
