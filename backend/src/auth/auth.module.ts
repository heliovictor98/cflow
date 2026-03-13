import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnidadeModule } from '../unidades/unidade.module';
import { UsuarioModule } from '../usuarios/usuario.module';

@Module({
  imports: [UnidadeModule, UsuarioModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
