import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { UsuariosService, Usuario, CreateUsuarioDto, PerfilUsuario, PERFIL_LABELS } from '../../core/services/usuarios.service';
import { PhoneMaskDirective } from '../../core/directives/phone-mask.directive';

@Component({
  selector: 'app-usuario-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    PhoneMaskDirective,
  ],
  templateUrl: './usuario-form.dialog.html',
  styleUrl: './usuario-form.dialog.scss',
})
export class UsuarioFormDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private usuariosService = inject(UsuariosService);
  private ref = inject(MatDialogRef<UsuarioFormDialogComponent>);
  data = inject<Usuario | null>(MAT_DIALOG_DATA);

  readonly perfis: PerfilUsuario[] = ['ADM', 'PORTARIA', 'ZELADORIA_LIMPEZA'];
  readonly perfilLabels = PERFIL_LABELS;

  form = this.fb.nonNullable.group({
    nomeCompleto: ['', Validators.required],
    contato: [''],
    perfil: ['ADM' as PerfilUsuario, Validators.required],
    login: ['', Validators.required],
  });
  loading = false;
  error = '';

  get isEdit(): boolean {
    return !!this.data?.id;
  }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({
        nomeCompleto: this.data.nomeCompleto,
        contato: this.data.contato ?? '',
        perfil: this.data.perfil,
        login: this.data.login,
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.error = '';
    this.loading = true;
    const value = this.form.getRawValue();
    const dto: CreateUsuarioDto = {
      nomeCompleto: value.nomeCompleto,
      contato: value.contato || undefined,
      perfil: value.perfil,
      login: value.login,
    };
    const req = this.isEdit
      ? this.usuariosService.update(this.data!.id, dto)
      : this.usuariosService.create(dto);
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
