import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { NotificacoesService, Categoria } from '../../core/services/notificacoes.service';

@Component({
  selector: 'app-notificacoes-categorias-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    FormsModule,
  ],
  templateUrl: './notificacoes-categorias.page.html',
  styleUrl: './notificacoes-categorias.page.scss',
})
export class NotificacoesCategoriasPage implements OnInit {
  private notificacoesService = inject(NotificacoesService);

  categorias: Categoria[] = [];
  filtro = '';
  loading = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.notificacoesService.listCategorias().subscribe({
      next: (list) => {
        this.categorias = list;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  get categoriasFiltradas(): Categoria[] {
    const q = this.filtro.trim().toLowerCase();
    if (!q) return this.categorias;
    return this.categorias.filter(
      (c) =>
        c.nome.toLowerCase().includes(q) ||
        (c.descricao?.toLowerCase().includes(q) ?? false)
    );
  }
}
