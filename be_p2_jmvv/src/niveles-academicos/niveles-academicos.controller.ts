import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NivelesAcademicosService } from './niveles-academicos.service';
import { CreateNivelAcademicoDto } from './dto/create-nivel-academico.dto';
import { UpdateNivelAcademicoDto } from './dto/update-nivel-academico.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('niveles-academicos')
@Controller('niveles-academicos')
export class NivelesAcademicosController {
  constructor(private readonly nivelesAcademicosService: NivelesAcademicosService) {}

  @Post()
  create(@Body() createNivelAcademicoDto: CreateNivelAcademicoDto) {
    return this.nivelesAcademicosService.create(createNivelAcademicoDto);
  }

  @Get()
  findAll() {
    return this.nivelesAcademicosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nivelesAcademicosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNivelAcademicoDto: UpdateNivelAcademicoDto) {
    return this.nivelesAcademicosService.update(+id, updateNivelAcademicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nivelesAcademicosService.remove(+id);
  }
}