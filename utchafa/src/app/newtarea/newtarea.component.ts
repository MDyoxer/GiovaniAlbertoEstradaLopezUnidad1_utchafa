import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { NavComponent } from "../nav/nav.component"; 
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-newtarea',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavComponent,FormsModule,HttpClientModule], 
  templateUrl: './newtarea.component.html',
  styleUrl: './newtarea.component.css'
})
export class NewtareaComponent {
 
  newTarea = {nombre: '', materia = '', fecha_limite = '' };
  
  constructor(private http:HttpClient){}

  //verificar datos
  newTarea(){
    if(!this.newTarea.nombre || !this.newTarea.materia || !this.newTarea.fecha_limite){
       Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, complete todos los campos antes de guardar.',
        confirmButtonText: 'Entendido'
      });
      return;
    }
    const body = {
      nombre: this.newTarea.nombre,
      materia: this.newTarea.materia,
      fecha_limite: this.newTarea.fecha_limite
    };
    //cabezeras
    const headers = new HttpHeaders().set('Content-Type','application/json');
    this.http.post('http://localhost/api-utchafa/tareas/new_tarea.php',body,{headers})
    .subscribe({
      
    })
  }
  
}