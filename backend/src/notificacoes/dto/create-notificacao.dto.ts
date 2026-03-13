import { DadosComplementares } from '../entities/notificacao.entity';

export class CreateNotificacaoDto {
  subcategoriaId!: number;
  /** Campos por categoria: Barulho { horarioOcorrencia, descricao }; Manutenção { diasProblema, detalhe } */
  dadosComplementares?: DadosComplementares | null;
}
