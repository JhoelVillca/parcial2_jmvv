import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { NivelAcademico } from '../../niveles-academicos/entities/nivel-academico.entity';

@Entity('programas')
export class Programa {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'id_nivel_academico', type: 'integer', nullable: false })
  idNivelAcademico: number;

  @ManyToOne(() => NivelAcademico, (nivel) => nivel.programas)
  @JoinColumn({ name: 'id_nivel_academico' })
  nivelAcademico: NivelAcademico;

  @Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ name: 'descripcion', type: 'varchar', length: 2000, nullable: false })
  descripcion: string;

  @Column({ name: 'version', type: 'integer', nullable: false })
  version: number;

  @Column({ name: 'duracion_meses', type: 'integer', nullable: false })
  duracionMeses: number;

  @Column({ name: 'costo', type: 'numeric', precision: 10, scale: 2, nullable: false })
  costo: number;

  @Column({ name: 'fecha_inicio', type: 'date', nullable: false })
  fechaInicio: Date;

  @Column({ name: 'estado', type: 'varchar', length: 20, nullable: false })
  estado: string; 

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', type: 'timestamp' })
  fechaEliminacion: Date;
}