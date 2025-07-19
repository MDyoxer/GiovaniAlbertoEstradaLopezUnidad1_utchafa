import { Component, OnInit } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [NavComponent, CommonModule, DatePipe,FormsModule],
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  usuarioActual: string = '';
  Tareas: any[] = [];
  materiasUnicas: string[] = [];

  constructor(
    private http: HttpClient, 
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    this.usuarioActual = user?.nombre || user?.email || 'Usuario';
    this.fetchTareas();
  }

  fetchTareas() {
this.http.get<any[]>('https://backendutchafa.shop/api-utchafa/tareas/all_tareas.php')
      .subscribe({
        next: (data) => {
          this.Tareas = data;
          this.materiasUnicas = [...new Set(data.map(t => t.materia))];
        },
        error: (error) => {
          console.error('Error al conseguir las tareas', error);
        }
      });
  }

  calcularDiasRestantes(fechaLimite: string): number {
    const hoy = new Date();
    const limite = new Date(fechaLimite);
    const diffTime = limite.getTime() - hoy.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  esUrgente(fechaLimite: string): boolean {
    return this.calcularDiasRestantes(fechaLimite) <= 3;
  }

  //eliminar tareas
  eliminarTareas(id:number){
this.http.delete(`https://backendutchafa.shop/api-utchafa/tareas/delete_tarea.php?id=${id}`, { responseType: 'json' })
    .subscribe({
   next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Tarea eliminada',
            text: 'La tarea fue eliminada correctamente.',
            confirmButtonText: 'OK'
          });
          this.fetchTareas();  
        },
        error: (error) => {
          console.error('Error al eliminar la tarea:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al eliminar',
            text: 'Hubo un problema al eliminar la tarea. Intente nuevamente.',
            confirmButtonText: 'Entendido'
          });
        }
      });
  }

busqueda: string = '';

get tareasFiltradas() {
  if (!this.busqueda.trim()) {
    return this.Tareas;
  }

  const filtro = this.busqueda.toLowerCase();
  return this.Tareas.filter(t =>
    t.nombre.toLowerCase().includes(filtro) ||
    t.materia.toLowerCase().includes(filtro)
  );
}
}