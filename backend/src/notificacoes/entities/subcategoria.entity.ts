import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Categoria } from './categoria.entity';

@Entity('tb_subcategoria')
export class Subcategoria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'categoria_id' })
  categoriaId!: number;

  @Column({ type: 'varchar', length: 100 })
  nome!: string;

  @Column({ type: 'varchar', length: 80 })
  icone!: string;

  @Column({ name: 'ordem', type: 'int', default: 0 })
  ordem!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => Categoria, (c) => c.subcategorias, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'categoria_id' })
  categoria!: Categoria;
}
