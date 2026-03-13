import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Unidade } from '../../unidades/entities/unidade.entity';
import { Subcategoria } from './subcategoria.entity';

/** Campos extras por categoria: Barulho = horarioOcorrencia + descricao; Manutenção = diasProblema + detalhe */
export type DadosComplementaresBarulho = {
  horarioOcorrencia?: string;
  descricao?: string;
};

export type DadosComplementaresManutencao = {
  diasProblema?: number | string;
  detalhe?: string;
};

export type DadosComplementares = DadosComplementaresBarulho | DadosComplementaresManutencao;

@Entity('tb_notificacao')
export class Notificacao {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'numero_protocolo', type: 'varchar', length: 30, unique: true })
  numeroProtocolo!: string;

  @Column({ name: 'unidade_id' })
  unidadeId!: number;

  @Column({ name: 'subcategoria_id' })
  subcategoriaId!: number;

  @Column({ type: 'varchar', length: 30, default: 'ABERTO' })
  status!: string;

  @Column({ name: 'dados_complementares', type: 'jsonb', nullable: true })
  dadosComplementares!: DadosComplementares | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => Unidade, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'unidade_id' })
  unidade?: Unidade;

  @ManyToOne(() => Subcategoria, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'subcategoria_id' })
  subcategoria?: Subcategoria;
}
