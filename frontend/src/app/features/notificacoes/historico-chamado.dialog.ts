import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  NotificacoesService,
  Notificacao,
  NotificacaoHistorico,
} from '../../core/services/notificacoes.service';

export interface HistoricoChamadoDialogData {
  notificacao: Notificacao;
  isAdmin: boolean;
}

@Component({
  selector: 'app-historico-chamado-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './historico-chamado.dialog.html',
  styleUrl: './historico-chamado.dialog.scss',
})
export class HistoricoChamadoDialogComponent implements OnInit {
  private notificacoesService = inject(NotificacoesService);
  private ref = inject(MatDialogRef<HistoricoChamadoDialogComponent>);
  readonly data = inject<HistoricoChamadoDialogData>(MAT_DIALOG_DATA);

  historico: NotificacaoHistorico[] = [];
  loading = true;
  comentario = '';
  encerrarTexto = '';
  submittingComentario = false;
  submittingEncerrar = false;
  error = '';

  get notificacao(): Notificacao {
    return this.data.notificacao;
  }

  get isAdmin(): boolean {
    return this.data.isAdmin;
  }

  get podeComentarOuEncerrar(): boolean {
    return this.isAdmin && this.notificacao.status !== 'ENCERRADO';
  }

  ngOnInit(): void {
    this.loadHistorico();
  }

  loadHistorico(): void {
    this.loading = true;
    this.notificacoesService.getHistorico(this.notificacao.id).subscribe({
      next: (list) => {
        const raw = (list ?? []) as unknown as Record<string, unknown>[];
        this.historico = raw.map((a) => ({
          id: (a['id'] ?? 0) as number,
          notificacaoId: (a['notificacaoId'] ?? a['notificacao_id']) as number,
          tipo: (a['tipo'] ?? 'CRIACAO') as NotificacaoHistorico['tipo'],
          autorUnidadeId: (a['autorUnidadeId'] ?? a['autor_unidade_id']) as number | null,
          autorUsuarioId: (a['autorUsuarioId'] ?? a['autor_usuario_id']) as number | null,
          texto: (a['texto'] ?? null) as string | null,
          createdAt: (a['createdAt'] ?? a['created_at']) as string,
          autorUnidade: a['autorUnidade'] ?? a['autor_unidade'],
          autorUsuario: a['autorUsuario'] ?? a['autor_usuario'],
        })) as NotificacaoHistorico[];
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  autorLabel(item: NotificacaoHistorico): string {
    const a = item as unknown as Record<string, unknown>;
    const unidade = a['autorUnidade'] as Record<string, unknown> | undefined;
    const usuario = a['autorUsuario'] as Record<string, unknown> | undefined;
    if (unidade) {
      const bloco = unidade['bloco'] ?? '';
      const ap = unidade['apartamento'] ?? '';
      const nome = unidade['nomeMoradorResponsavel'] ?? '';
      return nome ? `${nome} (${bloco} - ${ap})` : `Unidade ${bloco} - ${ap}`;
    }
    if (usuario) return (usuario['nomeCompleto'] as string) ?? 'Usuário';
    return 'Administrador';
  }

  tipoLabel(tipo: string): string {
    const map: Record<string, string> = {
      CRIACAO: 'Criação',
      COMENTARIO: 'Comentário',
      ENCERRAMENTO: 'Encerramento',
    };
    return map[tipo] ?? tipo;
  }

  addComentario(): void {
    const t = this.comentario?.trim();
    if (!t) return;
    this.error = '';
    this.submittingComentario = true;
    this.notificacoesService.addComentario(this.notificacao.id, t).subscribe({
      next: () => {
        this.comentario = '';
        this.submittingComentario = false;
        this.loadHistorico();
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'Erro ao enviar comentário.';
        this.submittingComentario = false;
      },
    });
  }

  encerrar(): void {
    this.error = '';
    this.submittingEncerrar = true;
    this.notificacoesService.encerrar(this.notificacao.id, this.encerrarTexto?.trim()).subscribe({
      next: () => {
        this.submittingEncerrar = false;
        this.ref.close(true);
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'Erro ao encerrar.';
        this.submittingEncerrar = false;
      },
    });
  }

  fechar(): void {
    this.ref.close(false);
  }
}
