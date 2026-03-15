import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Subcategoria } from './entities/subcategoria.entity';
import { Notificacao } from './entities/notificacao.entity';
import { NotificacaoHistorico } from './entities/notificacao-historico.entity';
import { NotificacaoService } from './notificacao.service';
import { NotificacaoController } from './notificacao.controller';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UsuarioModule } from '../usuarios/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categoria, Subcategoria, Notificacao, NotificacaoHistorico]),
    UsuarioModule,
  ],
  controllers: [NotificacaoController],
  providers: [NotificacaoService, AuthGuard],
  exports: [NotificacaoService],
})
export class NotificacaoModule {}
