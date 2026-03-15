import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Notificacao } from './notificacao.entity';
import { Unidade } from '../../unidades/entities/unidade.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

export type TipoHistorico = 'CRIACAO' | 'COMENTARIO' | 'ENCERRAMENTO';

@Entity('tb_notificacao_historico')
export class NotificacaoHistorico {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'notificacao_id' })
  notificacaoId!: number;

  @Column({ type: 'varchar', length: 30 })
  tipo!: TipoHistorico;

  @Column({ name: 'autor_unidade_id', nullable: true })
  autorUnidadeId!: number | null;

  @Column({ name: 'autor_usuario_id', nullable: true })
  autorUsuarioId!: number | null;

  @Column({ type: 'text', nullable: true })
  texto!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => Notificacao, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'notificacao_id' })
  notificacao?: Notificacao;

  @ManyToOne(() => Unidade, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'autor_unidade_id' })
  autorUnidade?: Unidade | null;

  @ManyToOne(() => Usuario, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'autor_usuario_id' })
  autorUsuario?: Usuario | null;
}
