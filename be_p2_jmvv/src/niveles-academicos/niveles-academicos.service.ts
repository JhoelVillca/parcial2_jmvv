import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNivelAcademicoDto } from './dto/create-nivel-academico.dto';
import { UpdateNivelAcademicoDto } from './dto/update-nivel-academico.dto';
import { NivelAcademico } from './entities/nivel-academico.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NivelesAcademicosService {
  constructor(@InjectRepository(NivelAcademico) private nivelesRepository: Repository<NivelAcademico>) {}

  async create(createNivelAcademicoDto: CreateNivelAcademicoDto): Promise<NivelAcademico> {
    let nivel = await this.nivelesRepository.findOneBy({
      nombre: createNivelAcademicoDto.nombre.trim(),
    });
    if (nivel) throw new ConflictException('El nivel académico ya existe');

    nivel = new NivelAcademico();
    Object.assign(nivel, createNivelAcademicoDto);
    return this.nivelesRepository.save(nivel);
  }

  async findAll(): Promise<NivelAcademico[]> {
    return this.nivelesRepository.find({ order: { nombre: 'ASC' } });
  }

  async findOne(id: number): Promise<NivelAcademico> {
    const nivel = await this.nivelesRepository.findOneBy({ id });
    if (!nivel) throw new NotFoundException('El nivel académico no existe');
    return nivel;
  }

  async update(id: number, updateNivelAcademicoDto: UpdateNivelAcademicoDto): Promise<NivelAcademico> {
    const nivel = await this.findOne(id);
    Object.assign(nivel, updateNivelAcademicoDto);
    return this.nivelesRepository.save(nivel);
  }

  async remove(id: number): Promise<NivelAcademico> {
    const nivel = await this.findOne(id);
    return this.nivelesRepository.softRemove(nivel); 
  }
}