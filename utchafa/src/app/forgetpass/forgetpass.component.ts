import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

const API_URL = 'http://localhost/api-utchafa';

@Component({
  selector: 'app-forgetpass',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements OnInit {
  forgotForm!: FormGroup; // Usamos el operador ! para indicar que se inicializará en ngOnInit
  submitted = false;
  loading = false;
  message = '';
  success = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() { return this.forgotForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.message = '';
    this.success = false;

    if (this.forgotForm.invalid) {
      return;
    }

    this.loading = true;
    
    this.http.post(`${API_URL}/recuperar-contrasena.php`, {
      email: this.f['email'].value
    }).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.success = response.success;
        this.message = response.message;
      },
      error: (error) => {
        this.loading = false;
        this.success = false;
        this.message = 'Ocurrió un error al procesar tu solicitud.';
        console.error(error);
      }
    });
  }
}