import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { adminGuard } from './core/admin.guard';
import { MainLayoutComponent } from './core/layout/main-layout.component';
import { LoginPage } from './features/login/login.page';
import { HomePage } from './features/home/home.page';
import { DefinirSenhaPage } from './features/definir-senha/definir-senha.page';
import { UnidadesListPage } from './features/unidades/unidades-list.page';
import { UsuariosListPage } from './features/usuarios/usuarios-list.page';
import { NotificacoesCategoriasPage } from './features/notificacoes/notificacoes-categorias.page';
import { NotificacoesSubcategoriasPage } from './features/notificacoes/notificacoes-subcategorias.page';
import { NotificacaoNovaPage } from './features/notificacoes/notificacao-nova.page';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomePage },
      { path: 'definir-senha', component: DefinirSenhaPage },
      { path: 'notificacoes', component: NotificacoesCategoriasPage },
      { path: 'notificacoes/categoria/:categoriaId', component: NotificacoesSubcategoriasPage },
      { path: 'notificacoes/categoria/:categoriaId/subcategoria/:subcategoriaId/novo', component: NotificacaoNovaPage },
      { path: 'unidades', component: UnidadesListPage, canActivate: [adminGuard] },
      { path: 'usuarios', component: UsuariosListPage, canActivate: [adminGuard] },
      { path: '', pathMatch: 'full', redirectTo: 'home' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
