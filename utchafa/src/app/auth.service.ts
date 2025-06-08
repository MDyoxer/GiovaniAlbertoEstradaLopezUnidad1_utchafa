import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/api-utchafa/auth/';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(email: string, contra: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login.php`, { email, contra }).pipe(
      tap(response => {
        if (response && response.success) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        } else {
          throw new Error(response?.message || 'Credenciales incorrectas');
        }
      }),
      catchError(error => {
        let errorMessage = 'Error desconocido';
        
        if (error.status === 0) {
          errorMessage = 'Error de conexión con el servidor';
        } else if (error.status === 401) {
          errorMessage = 'Credenciales inválidas';
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.currentUserValue !== null;

    
  }
   getCurrentUser() {
    return this.currentUserSubject.value;
}
}