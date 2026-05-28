import { PartialType } from '@nestjs/swagger';
import { CreateNivelAcademicoDto } from './create-nivel-academico.dto';

export class UpdateNivelAcademicoDto extends PartialType(CreateNivelAcademicoDto) {}