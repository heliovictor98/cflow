import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  NotificacoesService,
  Subcategoria,
  DadosComplementaresBarulho,
  DadosComplementaresManutencao,
} from '../../core/services/notificacoes.service';

@Component({
  selector: 'app-notificacao-nova-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './notificacao-nova.page.html',
  styleUrl: './notificacao-nova.page.scss',
})
export class NotificacaoNovaPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private notificacoesService = inject(NotificacoesService);

  subcategoria: Subcategoria | null = null;
  loading = false;
  submitting = false;
  protocolo: string | null = null;
  errorMessage: string | null = null;

  /** Formulário dinâmico: Barulho = horario + descricao; Manutenção = dias + detalhe */
  form = this.fb.group({
    horarioOcorrencia: [''],
    descricao: [''],
    diasProblema: [null as number | null],
    detalhe: [''],
  });

  get categoriaId(): number {
    return Number(this.route.snapshot.paramMap.get('categoriaId'));
  }

  get subcategoriaId(): number {
    return Number(this.route.snapshot.paramMap.get('subcategoriaId'));
  }

  get isBarulho(): boolean {
    return this.subcategoria?.categoria?.nome === 'Barulho';
  }

  get isManutencao(): boolean {
    return this.subcategoria?.categoria?.nome === 'Manutenção';
  }

  ngOnInit(): void {
    const subId = this.subcategoriaId;
    if (!subId) return;
    this.loading = true;
    this.notificacoesService.getSubcategoria(subId).subscribe({
      next: (sub) => {
        this.subcategoria = sub;
        this.configurarValidadores();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Subcategoria não encontrada.';
      },
    });
  }

  private configurarValidadores(): void {
    this.form.get('horarioOcorrencia')?.clearValidators();
    this.form.get('descricao')?.clearValidators();
    this.form.get('diasProblema')?.clearValidators();
    this.form.get('detalhe')?.clearValidators();
    if (this.isBarulho) {
      this.form.get('horarioOcorrencia')?.setValidators([Validators.required]);
      this.form.get('descricao')?.setValidators([Validators.required]);
    }
    if (this.isManutencao) {
      this.form.get('diasProblema')?.setValidators([Validators.required]);
      this.form.get('detalhe')?.setValidators([Validators.required]);
    }
    this.form.updateValueAndValidity();
  }

  submit(): void {
    if (!this.subcategoria) return;
    const subId = this.subcategoria.id;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    let dadosComplementares: DadosComplementaresBarulho | DadosComplementaresManutencao;
    if (this.isBarulho) {
      dadosComplementares = {
        horarioOcorrencia: this.form.value.horarioOcorrencia ?? '',
        descricao: this.form.value.descricao ?? '',
      };
    } else if (this.isManutencao) {
      const dias = this.form.value.diasProblema;
      dadosComplementares = {
        diasProblema: dias != null ? Number(dias) : undefined,
        detalhe: this.form.value.detalhe ?? '',
      };
    } else {
      dadosComplementares = {};
    }

    this.submitting = true;
    this.errorMessage = null;
    this.notificacoesService
      .create({
        subcategoriaId: subId,
        dadosComplementares,
      })
      .subscribe({
        next: (not) => {
          this.protocolo = not.numeroProtocolo;
          this.submitting = false;
        },
        error: (err) => {
          this.submitting = false;
          this.errorMessage =
            err.error?.message ?? 'Não foi possível registrar a notificação. Tente novamente.';
        },
      });
  }

  voltarParaCategorias(): void {
    this.router.navigate(['/notificacoes']);
  }

  novaNotificacao(): void {
    this.protocolo = null;
    this.form.reset();
    this.router.navigate(['/notificacoes']);
  }
}
