import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Gender } from './entities/gender.entity';
import { Prisma } from '@prisma/client';
import { handleError } from 'src/utils/handle-error';
import { notFoundError } from 'src/utils/not-found';
import { dataTreatment } from 'src/utils/data-treatment';

@Injectable()
export class GenderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGenderDto): Promise<Gender> {
    const data: Prisma.GenderCreateInput = { name: dto.name };

    data.name = await dataTreatment(data.name);

    return this.prisma.gender.create({ data }).catch(handleError);
  }

  async findAll(): Promise<Gender[]> {
    const list = await this.prisma.gender.findMany();

    if (list.length === 0) {
      throw new NotFoundException(
        'Não existem gêneros cadastrados. Que tal cadastrar o primeiro?',
      );
    }
    return list;
  }

  async findOne(id: string) {
    const record = await this.prisma.gender.findUnique({ where: { id } });

    notFoundError(record, id);

    return record;
  }

  async update(id: string, dto: UpdateGenderDto): Promise<Gender> {
    await this.findOne(id);

    const data: Partial<Gender> = { ...dto };

    data.name = await dataTreatment(data.name);

    return this.prisma.gender
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findOne(id);

    await this.prisma.gender.delete({
      where: { id },
    });
    throw new HttpException('Genero deletado com sucesso', 204);
  }
}
