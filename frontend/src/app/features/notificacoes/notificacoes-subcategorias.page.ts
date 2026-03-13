import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import {
  NotificacoesService,
  Categoria,
  Subcategoria,
} from '../../core/services/notificacoes.service';

@Component({
  selector: 'app-notificacoes-subcategorias-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    FormsModule,
  ],
  templateUrl: './notificacoes-subcategorias.page.html',
  styleUrl: './notificacoes-subcategorias.page.scss',
})
export class NotificacoesSubcategoriasPage implements OnInit {
  private route = inject(ActivatedRoute);
  private notificacoesService = inject(NotificacoesService);

  categoria: Categoria | null = null;
  subcategorias: Subcategoria[] = [];
  filtro = '';
  loading = false;

  get categoriaId(): number {
    return Number(this.route.snapshot.paramMap.get('categoriaId'));
  }

  ngOnInit(): void {
    const id = this.categoriaId;
    if (!id) return;
    this.loading = true;
    this.notificacoesService.getCategoria(id).subscribe({
      next: (c) => {
        this.categoria = c;
        this.loadSubcategorias();
      },
      error: () => (this.loading = false),
    });
  }

  loadSubcategorias(): void {
    this.notificacoesService.listSubcategorias(this.categoriaId).subscribe({
      next: (list) => {
        this.subcategorias = list;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  get subcategoriasFiltradas(): Subcategoria[] {
    const q = this.filtro.trim().toLowerCase();
    if (!q) return this.subcategorias;
    return this.subcategorias.filter(
      (s) =>
        s.nome.toLowerCase().includes(q)
    );
  }
}
