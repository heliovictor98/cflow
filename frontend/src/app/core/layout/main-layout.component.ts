import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  @ViewChild('drawer') sidenav!: MatSidenav;

  constructor(private auth: AuthService) {}

  isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  displayNameUpper(): string {
    return this.auth.getDisplayName().toUpperCase();
  }

  profileUpper(): string {
    return this.auth.getProfile().toUpperCase();
  }

  get isHandset(): boolean {
    return typeof window !== 'undefined' && window.innerWidth < 600;
  }

  closeSidenavIfHandset(): void {
    if (this.sidenav && this.isHandset) {
      this.sidenav.close();
    }
  }

  logout(): void {
    this.auth.logout();
  }
}
