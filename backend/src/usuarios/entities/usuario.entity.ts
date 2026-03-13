import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type PerfilUsuario = 'ADM' | 'PORTARIA' | 'ZELADORIA_LIMPEZA';

@Entity('tb_usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 200 })
  nomeCompleto!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  contato!: string | null;

  @Column({ type: 'varchar', length: 30 })
  perfil!: PerfilUsuario;

  @Column({ type: 'varchar', length: 50, unique: true })
  login!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  senha!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}

export const PERFIS: PerfilUsuario[] = ['ADM', 'PORTARIA', 'ZELADORIA_LIMPEZA'];

export const PERFIL_LABELS: Record<PerfilUsuario, string> = {
  ADM: 'Administrador',
  PORTARIA: 'Portaria',
  ZELADORIA_LIMPEZA: 'Zeladoria/Limpeza',
};
