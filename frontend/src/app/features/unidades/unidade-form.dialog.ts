import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UnidadesService, Unidade, CreateUnidadeDto } from '../../core/services/unidades.service';
import { PhoneMaskDirective } from '../../core/directives/phone-mask.directive';

@Component({
  selector: 'app-unidade-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    PhoneMaskDirective,
  ],
  templateUrl: './unidade-form.dialog.html',
  styleUrl: './unidade-form.dialog.scss',
})
export class UnidadeFormDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private unidadesService = inject(UnidadesService);
  private ref = inject(MatDialogRef<UnidadeFormDialogComponent>);
  data = inject<Unidade | null>(MAT_DIALOG_DATA);

  form = this.fb.nonNullable.group({
    bloco: ['', Validators.required],
    apartamento: ['', Validators.required],
    contato: [''],
    nomeMoradorResponsavel: ['', Validators.required],
  });
  loading = false;
  error = '';

  get isEdit(): boolean {
    return !!this.data?.id;
  }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({
        bloco: this.data.bloco,
        apartamento: this.data.apartamento,
        contato: this.data.contato ?? '',
        nomeMoradorResponsavel: this.data.nomeMoradorResponsavel,
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.error = '';
    this.loading = true;
    const value = this.form.getRawValue();
    const dto: CreateUnidadeDto = {
      bloco: value.bloco,
      apartamento: value.apartamento,
      contato: value.contato || undefined,
      nomeMoradorResponsavel: value.nomeMoradorResponsavel,
    };
    const req = this.isEdit
      ? this.unidadesService.update(this.data!.id, dto)
      : this.unidadesService.create(dto);
    req.subscribe({
      next: () => this.ref.close(true),
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message ?? 'Erro ao salvar.';
      },
      complete: () => (this.loading = false),
    });
  }

  cancel(): void {
    this.ref.close(false);
  }
}
