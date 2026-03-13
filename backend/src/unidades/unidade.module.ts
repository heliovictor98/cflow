import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unidade } from './entities/unidade.entity';
import { UnidadeService } from './unidade.service';
import { UnidadeController } from './unidade.controller';
import { UsuarioModule } from '../usuarios/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([Unidade]), UsuarioModule],
  controllers: [UnidadeController],
  providers: [UnidadeService],
  exports: [UnidadeService],
})
export class UnidadeModule {}
