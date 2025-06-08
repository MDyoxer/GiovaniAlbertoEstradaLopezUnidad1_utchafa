import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  contra: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.email || !this.contra) {
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});
Toast.fire({
  icon: "warning",
  title: "Porfavor, completa todos los campos"
});
      return;
    }

    this.loading = true;

    this.authService.login(this.email, this.contra).subscribe({
      next: () => {
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/tareas']);
        });
      },
      error: (error) => {
        this.loading = false;
        let errorTitle = 'Error al iniciar sesión';
        let errorText = error.message || 'Ocurrió un error inesperado';
        let iconType: 'error' | 'warning' = 'error';

        if (error.status === 0) {
          errorTitle = 'Error de conexión';
          errorText = 'No se pudo conectar con el servidor';
        } else if (error.status === 401) {
          errorTitle = 'Credenciales incorrectas';
          errorText = 'El correo o contraseña son incorrectos';
          iconType = 'warning';
        }

        Swal.fire({
          icon: iconType,
          title: errorTitle,
          text: errorText,
          confirmButtonColor: '#3085d6'
        });
      }
    });
  }
}