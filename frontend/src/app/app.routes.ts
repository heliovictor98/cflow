import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { MainLayoutComponent } from './core/layout/main-layout.component';
import { LoginPage } from './features/login/login.page';
import { HomePage } from './features/home/home.page';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomePage },
      { path: '', pathMatch: 'full', redirectTo: 'home' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
