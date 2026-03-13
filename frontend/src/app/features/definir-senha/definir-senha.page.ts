import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-definir-senha-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './definir-senha.page.html',
  styleUrl: './definir-senha.page.scss',
})
export class DefinirSenhaPage {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  form = this.fb.nonNullable.group(
    {
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: (g) => (g.get('newPassword')?.value === g.get('confirmPassword')?.value ? null : { mismatch: true }) },
  );
  loading = false;
  error = '';

  onSubmit(): void {
    if (this.form.invalid) return;
    const token = this.auth.getToken();
    if (!token || (!token.startsWith('cflow-unidade-') && !token.startsWith('cflow-usuario-'))) {
      this.error = 'Sessão inválida. Faça login novamente.';
      return;
    }
    this.error = '';
    this.loading = true;
    const newPassword = this.form.getRawValue().newPassword;
    this.auth.setPassword(token, newPassword).subscribe({
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message ?? 'Erro ao definir senha.';
      },
      complete: () => (this.loading = false),
    });
  }
}
