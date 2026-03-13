import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { UsuariosService, Usuario, PERFIL_LABELS, PerfilUsuario } from '../../core/services/usuarios.service';
import { UsuarioFormDialogComponent } from './usuario-form.dialog';
import { ConfirmDialogComponent } from '../../core/confirm-dialog.component';

@Component({
  selector: 'app-usuarios-list-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './usuarios-list.page.html',
  styleUrl: './usuarios-list.page.scss',
})
export class UsuariosListPage implements OnInit {
  private usuariosService = inject(UsuariosService);
  private dialog = inject(MatDialog);

  readonly perfilLabels = PERFIL_LABELS;
  dataSource = new MatTableDataSource<Usuario>([]);
  displayedColumns = ['nomeCompleto', 'login', 'perfil', 'contato', 'senhaDefinida', 'acoes'];
  loading = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.usuariosService.list().subscribe({
      next: (list) => {
        this.dataSource.data = list;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  openCreate(): void {
    const ref = this.dialog.open(UsuarioFormDialogComponent, {
      width: '480px',
      data: null,
    });
    ref.afterClosed().subscribe((ok) => ok && this.load());
  }

  openEdit(usuario: Usuario): void {
    const ref = this.dialog.open(UsuarioFormDialogComponent, {
      width: '480px',
      data: usuario,
    });
    ref.afterClosed().subscribe((ok) => ok && this.load());
  }

  resetarSenha(usuario: Usuario): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Resetar senha',
        message: `Resetar a senha de ${usuario.nomeCompleto}? O usuário precisará definir uma nova senha no próximo acesso.`,
      },
    });
    ref.afterClosed().subscribe((ok) => {
      if (ok) {
        this.usuariosService.resetarSenha(usuario.id).subscribe(() => this.load());
      }
    });
  }

  remove(usuario: Usuario): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Excluir usuário',
        message: `Excluir o usuário ${usuario.nomeCompleto}?`,
      },
    });
    ref.afterClosed().subscribe((ok) => {
      if (ok) {
        this.usuariosService.remove(usuario.id).subscribe(() => this.load());
      }
    });
  }

  getPerfilLabel(perfil: string): string {
    return this.perfilLabels[perfil as PerfilUsuario] ?? perfil;
  }
}
