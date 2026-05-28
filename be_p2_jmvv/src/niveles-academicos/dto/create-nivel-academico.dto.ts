import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateNivelAcademicoDto {
  @ApiProperty({ example: 'Maestría', description: 'Nombre del nivel académico' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  nombre: string;

  @ApiProperty({ example: 'Programas de postgrado de tercer nivel', description: 'Descripción opcional', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  descripcion?: string;
}