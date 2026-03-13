import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = '/api/usuarios';

export type PerfilUsuario = 'ADM' | 'PORTARIA' | 'ZELADORIA_LIMPEZA';

export const PERFIL_LABELS: Record<PerfilUsuario, string> = {
  ADM: 'Administrador',
  PORTARIA: 'Portaria',
  ZELADORIA_LIMPEZA: 'Zeladoria/Limpeza',
};

export interface Usuario {
  id: number;
  nomeCompleto: string;
  contato: string | null;
  perfil: PerfilUsuario;
  login: string;
  senha: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUsuarioDto {
  nomeCompleto: string;
  contato?: string;
  perfil: PerfilUsuario;
  login: string;
}

export interface UpdateUsuarioDto {
  nomeCompleto?: string;
  contato?: string;
  perfil?: PerfilUsuario;
  login?: string;
}

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  constructor(private http: HttpClient) {}

  list(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(API);
  }

  getById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${API}/${id}`);
  }

  create(dto: CreateUsuarioDto): Observable<Usuario> {
    return this.http.post<Usuario>(API, dto);
  }

  update(id: number, dto: UpdateUsuarioDto): Observable<Usuario> {
    return this.http.patch<Usuario>(`${API}/${id}`, dto);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/${id}`);
  }

  resetarSenha(id: number): Observable<Usuario> {
    return this.http.post<Usuario>(`${API}/${id}/resetar-senha`, {});
  }
}
