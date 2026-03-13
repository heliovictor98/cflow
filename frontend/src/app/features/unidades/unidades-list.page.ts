import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { UnidadesService, Unidade } from '../../core/services/unidades.service';
import { UnidadeFormDialogComponent } from './unidade-form.dialog';
import { ConfirmDialogComponent } from '../../core/confirm-dialog.component';

@Component({
  selector: 'app-unidades-list-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './unidades-list.page.html',
  styleUrl: './unidades-list.page.scss',
})
export class UnidadesListPage implements OnInit {
  private unidadesService = inject(UnidadesService);
  private dialog = inject(MatDialog);

  dataSource = new MatTableDataSource<Unidade>([]);
  displayedColumns = ['bloco', 'apartamento', 'login', 'nomeMoradorResponsavel', 'contato', 'senhaDefinida', 'acoes'];
  loading = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.unidadesService.list().subscribe({
      next: (list) => {
        this.dataSource.data = list;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  openCreate(): void {
    const ref = this.dialog.open(UnidadeFormDialogComponent, {
      width: '480px',
      data: null,
    });
    ref.afterClosed().subscribe((ok) => ok && this.load());
  }

  openEdit(unidade: Unidade): void {
    const ref = this.dialog.open(UnidadeFormDialogComponent, {
      width: '480px',
      data: unidade,
    });
    ref.afterClosed().subscribe((ok) => ok && this.load());
  }

  resetarSenha(unidade: Unidade): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Resetar senha',
        message: `Resetar a senha da unidade ${unidade.bloco} - ${unidade.apartamento}? O morador precisará definir uma nova senha no próximo acesso.`,
      },
    });
    ref.afterClosed().subscribe((ok) => {
      if (ok) {
        this.unidadesService.resetarSenha(unidade.id).subscribe(() => this.load());
      }
    });
  }

  remove(unidade: Unidade): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Excluir unidade',
        message: `Excluir a unidade ${unidade.bloco} - ${unidade.apartamento}?`,
      },
    });
    ref.afterClosed().subscribe((ok) => {
      if (ok) {
        this.unidadesService.remove(unidade.id).subscribe(() => this.load());
      }
    });
  }
}
