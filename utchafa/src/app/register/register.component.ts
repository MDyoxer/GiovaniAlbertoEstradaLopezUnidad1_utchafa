import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';  
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']  
})
export class RegisterComponent {
  nombre = '';
  email = '';
  contra = '';
  contra2 = '';

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {
    // Validar campos vacíos
    if (!this.nombre || !this.email || !this.contra || !this.contra2) {
      Swal.fire({
        icon: 'warning',
        title: 'Datos incompletos',
        text: 'Por favor llena todos los campos.',
      });
      return;
    }

    if (this.contra !== this.contra2) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseñas incorrectas',
        text: 'Las contraseñas no coinciden. Intenta de nuevo.',
      });
      return;
    }

    const payload = {
      nombre: this.nombre,
      email: this.email,
      contra: this.contra,
      contra2: this.contra2
    };

    this.http.post('http://localhost/api-utchafa/auth/register.php', payload)
      .subscribe({
        next: (res: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Usuario creado correctamente',
            showConfirmButton: false,
            timer: 1200
          }).then(() => {
            this.router.navigate(['/login']);
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: err.error.message || 'Ocurrió un error al registrar el usuario.',
          });
        }
      });
  }
}
