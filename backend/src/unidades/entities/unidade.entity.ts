import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tb_unidade')
export class Unidade {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 20 })
  bloco!: string;

  @Column({ type: 'varchar', length: 20 })
  apartamento!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  contato!: string | null;

  @Column({ type: 'varchar', length: 200 })
  nomeMoradorResponsavel!: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  login!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  senha!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
