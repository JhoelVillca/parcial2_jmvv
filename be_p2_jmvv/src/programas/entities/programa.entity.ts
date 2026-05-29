import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { NivelAcademico } from '../../niveles-academicos/entities/nivel-academico.entity';

@Entity('programas')
export class Programa {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number | undefined;

  @Column({ name: 'id_nivel_academico', type: 'integer', nullable: false })
  idNivelAcademico: number | undefined;

  @ManyToOne(() => NivelAcademico, (nivel) => nivel.programas)
  @JoinColumn({ name: 'id_nivel_academico' })
  nivelAcademico: NivelAcademico | undefined;

  @Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false })
  nombre: string | undefined;

  @Column({ name: 'descripcion', type: 'varchar', length: 2000, nullable: false })
  descripcion: string | undefined;

  @Column({ name: 'version', type: 'integer', nullable: false })
  version: number | undefined;

  @Column({ name: 'duracion_meses', type: 'integer', nullable: false })
  duracionMeses: number | undefined;

  @Column({ name: 'costo', type: 'numeric', precision: 10, scale: 2, nullable: false })
  costo: number | undefined;

  @Column({ name: 'fecha_inicio', type: 'date', nullable: false })
  fechaInicio: Date | undefined;

  @Column({ name: 'estado', type: 'varchar', length: 20, nullable: false })
  estado: string | undefined; 

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date | undefined;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion: Date | undefined;

  @DeleteDateColumn({ name: 'fecha_eliminacion', type: 'timestamp' })
  fechaEliminacion: Date | undefined;

  @Column({ name: 'modalidad', type: 'varchar', length: 20, nullable: false, default: 'presencial' })
  modalidad: string | undefined;
}