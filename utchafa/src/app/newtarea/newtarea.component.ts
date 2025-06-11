import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-newtarea',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavComponent], 
  templateUrl: './newtarea.component.html',
  styleUrl: './newtarea.component.css'
})
export class NewtareaComponent {
  tareaForm: FormGroup;
  
  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.tareaForm = this.fb.group({
      nombre: ['', Validators.required],
      materia: ['', Validators.required],
      fecha_limite: ['', Validators.required]
    });
  }

  addTarea() {
    if (this.tareaForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, complete todos los campos antes de guardar.',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    const body = this.tareaForm.value;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    this.http.post('http://localhost/api-utchafa/tareas/new_tarea.php', body, { headers })
      .subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Tarea agregada',
            text: 'La tarea se ha registrado correctamente',
            confirmButtonText: 'OK'
          });
          this.tareaForm.reset();
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al agregar la tarea',
            confirmButtonText: 'OK'
          });
        }
      });
  }
}