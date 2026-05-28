import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Programa } from '../../programas/entities/programa.entity';

@Entity('niveles_academicos')
export class NivelAcademico {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'nombre', type: 'varchar', length: 20, nullable: false })
  nombre: string;

  @Column({ name: 'descripcion', type: 'varchar', length: 500, nullable: true })
  descripcion: string;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', type: 'timestamp' })
  fechaEliminacion: Date;

  @OneToMany(() => Programa, (programa) => programa.nivelAcademico)
  programas: Programa[];
}