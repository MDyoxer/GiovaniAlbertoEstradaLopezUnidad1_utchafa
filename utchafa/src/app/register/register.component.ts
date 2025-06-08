import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 Asegúrate de importar esto
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  nombre = '';
  email = '';
  contra = '';
  contra2 = '';

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {
    const payload = {
      nombre: this.nombre,
      email: this.email,
      contra: this.contra,
      contra2: this.contra2
    };

    this.http.post('http://localhost/api-utchafa/auth/register.php', payload)
      .subscribe({
        next: (res: any) => {
          console.log('Usuario registrado:', res);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error al registrar:', err);
          alert(err.error.message || 'Error al registrar');
        }
      });
  }
}
