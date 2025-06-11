import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [RouterLink, CommonModule, NavComponent],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent {
rutas = [
    { path: 'login', label: 'Iniciar sesión' },
    { path: 'register', label: 'Registrarse' },
    { path: 'tareas', label: 'Mis Tareas' },
    { path: 'restore', label: 'Restaurar contraseña' },
    { path: 'newtarea', label: 'Nueva Tarea' },
    { path: 'contact', label: 'Contacto' },
    { path: 'ayuda', label: 'Centro de Ayuda' },
    { path: 'chat', label: 'ChatBot' },
    { path: 'buzon', label: 'Buzón de sugerencias' },
    { path: 'forget', label: 'Olvidé mi contraseña' },
    { path: 'mapa', label: 'Mapa del Sitio' },
    { path: 'error', label: 'Error 404' },
  ];
}
