// tareas.component.ts
import { Component, OnInit } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [NavComponent, CommonModule],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css'
})
export class TareasComponent implements OnInit {
  usuarioActual: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    this.usuarioActual = user?.nombre || user?.email || 'Usuario';
  }
}