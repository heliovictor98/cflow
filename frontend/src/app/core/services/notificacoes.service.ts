import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = '/api/notificacoes';

export interface Categoria {
  id: number;
  nome: string;
  descricao: string | null;
  icone: string;
  ordem: number;
}

export interface Subcategoria {
  id: number;
  categoriaId: number;
  nome: string;
  icone: string;
  ordem: number;
  categoria?: Categoria;
}

export interface Notificacao {
  id: number;
  numeroProtocolo: string;
  unidadeId: number;
  subcategoriaId: number;
  status: string;
  dadosComplementares: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  subcategoria?: Subcategoria;
  unidade?: { bloco: string; apartamento: string };
}

/** Barulho: horarioOcorrencia, descricao. Manutenção: diasProblema, detalhe */
export interface DadosComplementaresBarulho {
  horarioOcorrencia?: string;
  descricao?: string;
}

export interface DadosComplementaresManutencao {
  diasProblema?: number | string;
  detalhe?: string;
}

export type DadosComplementares = DadosComplementaresBarulho | DadosComplementaresManutencao;

export interface CreateNotificacaoDto {
  subcategoriaId: number;
  dadosComplementares?: DadosComplementares | null;
}

@Injectable({ providedIn: 'root' })
export class NotificacoesService {
  constructor(private http: HttpClient) {}

  listCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${API}/categorias`);
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${API}/categorias/${id}`);
  }

  listSubcategorias(categoriaId: number): Observable<Subcategoria[]> {
    return this.http.get<Subcategoria[]>(`${API}/categorias/${categoriaId}/subcategorias`);
  }

  getSubcategoria(id: number): Observable<Subcategoria> {
    return this.http.get<Subcategoria>(`${API}/subcategorias/${id}`);
  }

  create(dto: CreateNotificacaoDto): Observable<Notificacao> {
    return this.http.post<Notificacao>(API, dto);
  }

  /** Morador: seus chamados. Admin: todos. */
  listChamados(): Observable<Notificacao[]> {
    return this.http.get<Notificacao[]>(`${API}/chamados`);
  }
}
