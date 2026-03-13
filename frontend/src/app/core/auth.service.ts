import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

const TOKEN_KEY = 'cflow_token';
const ADMIN_KEY = 'cflow_is_admin';
const DISPLAY_NAME_KEY = 'cflow_display_name';
const PROFILE_KEY = 'cflow_profile';
const API = '/api/auth';

export interface LoginResponse {
  token: string;
  username: string;
  isAdmin: boolean;
  displayName: string;
  profile: string;
  requiresPasswordSetup?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${API}/login`, { username, password })
      .pipe(
        tap((res) => {
          localStorage.setItem(TOKEN_KEY, res.token);
          localStorage.setItem(ADMIN_KEY, res.isAdmin ? '1' : '0');
          localStorage.setItem(DISPLAY_NAME_KEY, res.displayName ?? 'Usuário');
          localStorage.setItem(PROFILE_KEY, res.profile ?? (res.isAdmin ? 'Administrador' : 'Morador'));
          if (res.requiresPasswordSetup) {
            this.router.navigate(['/definir-senha']);
          } else {
            this.router.navigate(['/home']);
          }
        }),
      );
  }

  setPassword(token: string, newPassword: string): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(`${API}/set-password`, {
      token,
      newPassword,
    }).pipe(
      tap(() => {
        this.router.navigate(['/home']);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
    localStorage.removeItem(DISPLAY_NAME_KEY);
    localStorage.removeItem(PROFILE_KEY);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return localStorage.getItem(ADMIN_KEY) === '1';
  }

  getDisplayName(): string {
    return localStorage.getItem(DISPLAY_NAME_KEY) ?? 'Usuário';
  }

  getProfile(): string {
    return localStorage.getItem(PROFILE_KEY) ?? 'Usuário';
  }
}
