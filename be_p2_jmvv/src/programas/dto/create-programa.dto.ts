import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, Min } from 'class-validator';

export class CreateProgramaDto {
  @ApiProperty({ example: 1, description: 'ID del nivel académico asociado (FK)' })
  @IsInt()
  @IsNotEmpty()
  idNivelAcademico: number;

  @ApiProperty({ example: 'Maestría en Desarrollo Web', description: 'Nombre completo del programa' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({ example: 'Estudios avanzados de desarrollo fullstack', description: 'Detalle curricular extenso' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  descripcion: string;

  @ApiProperty({ example: 1, description: 'Número de versión del programa educativo' })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  version: number;

  @ApiProperty({ example: 18, description: 'Duración total expresada en meses' })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  duracionMeses: number;

  @ApiProperty({ example: 1500.50, description: 'Costo total de la matrícula' })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  costo: number;

  @ApiProperty({ example: '2026-06-01', description: 'Fecha programada para el inicio de clases' })
  @IsDateString()
  @IsNotEmpty()
  fechaInicio: Date;

  @ApiProperty({ 
    example: 'En Planificación', 
    enum: ['En Planificación', 'En curso', 'Finalizado'], 
    description: 'Estado actual del ciclo del programa' 
  })
  @IsEnum(['En Planificación', 'En curso', 'Finalizado'], {
    message: 'El estado debe ser: En Planificación, En curso o Finalizado'
  })
  @IsNotEmpty()
  estado: string;
}