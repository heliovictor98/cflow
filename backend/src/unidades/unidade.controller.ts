import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UnidadeService } from './unidade.service';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('unidades')
@UseGuards(AdminGuard)
export class UnidadeController {
  constructor(private readonly unidadeService: UnidadeService) {}

  @Post()
  create(@Body() dto: CreateUnidadeDto) {
    return this.unidadeService.create(dto);
  }

  @Get()
  findAll() {
    return this.unidadeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.unidadeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUnidadeDto,
  ) {
    return this.unidadeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.unidadeService.remove(id);
  }

  @Post(':id/resetar-senha')
  resetarSenha(@Param('id', ParseIntPipe) id: number) {
    return this.unidadeService.resetarSenha(id);
  }
}
