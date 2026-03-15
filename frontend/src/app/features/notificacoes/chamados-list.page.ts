import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { NotificacoesService, Notificacao } from '../../core/services/notificacoes.service';
import { AuthService } from '../../core/auth.service';
import { HistoricoChamadoDialogComponent } from './historico-chamado.dialog';

/** Garante camelCase na resposta (backend pode vir em snake_case). */
function normalizarNotificacao(item: Record<string, unknown>): Notificacao {
  return {
    id: (item['id'] ?? 0) as number,
    numeroProtocolo: (item['numeroProtocolo'] ?? item['numero_protocolo']) as string,
    unidadeId: (item['unidadeId'] ?? item['unidade_id']) as number,
    subcategoriaId: (item['subcategoriaId'] ?? item['subcategoria_id']) as number,
    status: (item['status'] ?? 'ABERTO') as string,
    dadosComplementares: (item['dadosComplementares'] ?? item['dados_complementares']) as Record<string, unknown> | null,
    createdAt: (item['createdAt'] ?? item['created_at']) as string,
    updatedAt: (item['updatedAt'] ?? item['updated_at']) as string,
    subcategoria: item['subcategoria'] as Notificacao['subcategoria'],
    unidade: item['unidade'] as Notificacao['unidade'],
  };
}

@Component({
  selector: 'app-chamados-list-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './chamados-list.page.html',
  styleUrl: './chamados-list.page.scss',
})
export class ChamadosListPage implements OnInit {
  private notificacoesService = inject(NotificacoesService);
  private auth = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);

  dataSource = new MatTableDataSource<Notificacao>([]);
  displayedColumns: string[] = [];
  loading = false;
  errorMessage: string | null = null;

  get isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  ngOnInit(): void {
    this.displayedColumns = this.isAdmin
      ? ['protocolo', 'unidade', 'categoria', 'subcategoria', 'status', 'data', 'acoes']
      : ['protocolo', 'categoria', 'subcategoria', 'status', 'data', 'acoes'];
    this.load();
  }

  openHistorico(row: Notificacao): void {
    const ref = this.dialog.open(HistoricoChamadoDialogComponent, {
      width: '560px',
      maxHeight: '90vh',
      data: { notificacao: row, isAdmin: this.isAdmin },
    });
    ref.afterClosed().subscribe((atualizar) => {
      if (atualizar) this.load();
    });
  }

  load(): void {
    this.loading = true;
    this.errorMessage = null;
    this.notificacoesService.listChamados().subscribe({
      next: (list) => {
        const raw = (list ?? []) as unknown as Record<string, unknown>[];
        const normalizado = raw.map((item) => normalizarNotificacao(item));
        this.dataSource = new MatTableDataSource<Notificacao>(normalizado);
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message ?? 'Erro ao carregar chamados. Verifique se você está logado como morador (unidade) ou administrador.';
        this.cdr.markForCheck();
      },
    });
  }

  unidadeLabel(row: Notificacao): string {
    if (!row.unidade) return '—';
    return `${row.unidade.bloco} - ${row.unidade.apartamento}`;
  }
}
