import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { RecaptchaModule } from 'ng-recaptcha';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RecaptchaModule,RouterLink],
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
      this.showToast('warning', 'Por favor, completa todos los campos');
      return;
    }

    this.loading = true;

    this.authService.login(this.email, this.contra).subscribe({
      next: (response) => {
        this.loading = false;
        if (response?.success) {
          this.showSuccessAlert('¡Bienvenido!').then(() => {
            this.router.navigate(['/tareas']);
          });
        } else {
          this.showError('Error al iniciar sesión', response?.error || 'Credenciales incorrectas');
        }
      },
      error: (error) => {
        this.loading = false;
        this.handleLoginError(error);
      }
    });
  }

// login.component.ts
private handleLoginError(error: any): void {
    console.log('Error completo:', error); // Para depuración
    
    // Extraer la respuesta del servidor (si existe)
    const serverResponse = error.error?.error ? error.error : error.error;
    
    if (error.status === 403) {
        // Manejar bloqueo
        const bloqueadoHasta = serverResponse?.bloqueado_hasta;
        const mensaje = serverResponse?.message || 
                       serverResponse?.error || 
                       'Cuenta bloqueada temporalmente';
        
        this.showError(
            'Cuenta bloqueada',
            bloqueadoHasta ? `${mensaje}. Intenta nuevamente después de ${bloqueadoHasta}` : mensaje
        );
    } else if (error.status === 401) {
        // Manejar credenciales incorrectas
        const intentosRestantes = serverResponse?.intentos_restantes;
        if (intentosRestantes !== undefined) {
            this.showWarning(
                'Credenciales incorrectas',
                `Te quedan ${intentosRestantes} intentos`
            );
        } else {
            this.showError(
                'Error al iniciar sesión',
                serverResponse?.error || 'Credenciales incorrectas'
            );
        }
    } else {
        // Otros errores
        this.showError(
            'Error',
            serverResponse?.message || 
            serverResponse?.error || 
            error.message || 
            'Error desconocido al conectar con el servidor'
        );
    }
}
  private showToast(icon: any, title: string): void {
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    }).fire({ icon, title });
  }

  private showSuccessAlert(title: string): Promise<any> {
    return Swal.fire({
      icon: 'success',
      title,
      showConfirmButton: false,
      timer: 1500
    });
  }

  private showError(title: string, text: string): void {
    Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonColor: '#3085d6'
    });
  }

  private showWarning(title: string, text: string): void {
    Swal.fire({
      icon: 'warning',
      title,
      text,
      confirmButtonColor: '#3085d6'
    });
  }
}