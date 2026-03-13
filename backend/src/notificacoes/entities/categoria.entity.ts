import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Subcategoria } from './subcategoria.entity';

@Entity('tb_categoria')
export class Categoria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  nome!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descricao!: string | null;

  @Column({ type: 'varchar', length: 80 })
  icone!: string;

  @Column({ name: 'ordem', type: 'int', default: 0 })
  ordem!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => Subcategoria, (s) => s.categoria)
  subcategorias?: Subcategoria[];
}
