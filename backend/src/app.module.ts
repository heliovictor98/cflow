import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AdminGuard } from './auth/guards/admin.guard';
import { UnidadeModule } from './unidades/unidade.module';
import { UsuarioModule } from './usuarios/usuario.module';
import { NotificacaoModule } from './notificacoes/notificacao.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER ?? 'cflow',
      password: process.env.DB_PASSWORD ?? 'cflow_secret',
      database: process.env.DB_NAME ?? 'cflow',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    AuthModule,
    UnidadeModule,
    UsuarioModule,
    NotificacaoModule,
  ],
  controllers: [AppController],
  providers: [AppService, AdminGuard],
})
export class AppModule {}
