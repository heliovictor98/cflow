import { AfterViewInit, Directive, ElementRef, HostListener, inject, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

/**
 * Máscara para celular BR: (XX) XXXXX-XXXX
 * O valor no form control fica só com dígitos (ex: 21992372545).
 */
@Directive({
  selector: 'input[appPhoneMask]',
  standalone: true,
})
export class PhoneMaskDirective implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef<HTMLInputElement>);
  private control = inject(NgControl, { optional: true });
  private sub?: Subscription;

  ngAfterViewInit(): void {
    this.formatFromControl();
    this.sub = this.control?.valueChanges?.subscribe(() => this.formatFromControl());
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const digits = this.digitsOnly(input.value);
    const limited = digits.slice(0, 11);
    this.formatDisplay(limited);
    this.control?.control?.setValue(limited || '', { emitEvent: false });
  }

  private formatFromControl(): void {
    const value = this.control?.value;
    if (value != null && value !== '') {
      const digits = this.digitsOnly(String(value));
      if (digits) this.formatDisplay(digits);
    }
  }

  private digitsOnly(s: string): string {
    return s.replace(/\D/g, '');
  }

  private formatDisplay(digits: string): void {
    const input = this.el.nativeElement;
    if (digits.length <= 2) {
      input.value = digits ? `(${digits}` : '';
    } else if (digits.length <= 7) {
      input.value = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else {
      input.value = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }
  }
}
