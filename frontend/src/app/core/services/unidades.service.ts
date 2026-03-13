import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = '/api/unidades';

export interface Unidade {
  id: number;
  bloco: string;
  apartamento: string;
  contato: string | null;
  nomeMoradorResponsavel: string;
  login: string;
  senha: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUnidadeDto {
  bloco: string;
  apartamento: string;
  contato?: string;
  nomeMoradorResponsavel: string;
}

export interface UpdateUnidadeDto {
  bloco?: string;
  apartamento?: string;
  contato?: string;
  nomeMoradorResponsavel?: string;
}

@Injectable({ providedIn: 'root' })
export class UnidadesService {
  constructor(private http: HttpClient) {}

  list(): Observable<Unidade[]> {
    return this.http.get<Unidade[]>(API);
  }

  getById(id: number): Observable<Unidade> {
    return this.http.get<Unidade>(`${API}/${id}`);
  }

  create(dto: CreateUnidadeDto): Observable<Unidade> {
    return this.http.post<Unidade>(API, dto);
  }

  update(id: number, dto: UpdateUnidadeDto): Observable<Unidade> {
    return this.http.patch<Unidade>(`${API}/${id}`, dto);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/${id}`);
  }

  resetarSenha(id: number): Observable<Unidade> {
    return this.http.post<Unidade>(`${API}/${id}/resetar-senha`, {});
  }
}
