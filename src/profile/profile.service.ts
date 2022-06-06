import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile';
import { UpdateProfileDto } from './dto/update-profile';
import { PrismaService } from '../prisma/prisma.service';
import { Profile } from './entities/profile.entity';
import { Prisma } from '@prisma/client';
import { handleError } from 'src/utils/handle-error';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProfileDto) {
    const data: Prisma.ProfileCreateInput = {
      title: dto.title,
      user: {
        connect: {
          id: dto.userId,
        },
      },
      imageUrl: dto.imageUrl,
    };

    return await this.prisma.profile
      .create({
        data,
        select: {
          id: true,
          imageUrl: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })
      .catch(handleError);
  }

  async findAll() {
    const list = await this.prisma.profile.findMany({
      select: {
        id: true,
        title: true,
        userId: true,
        imageUrl: true,
        _count: { select: { gameProfiles: true } },
      },
    });

    if (list.length === 0) {
      throw new NotFoundException('Não existem perfis cadastrados.');
    }
    return list;
  }

  async findOne(id: string) {
    const record = await this.prisma.profile.findUnique({
      where: { id },
      select: {
        title: true,
        imageUrl: true,
        user: {
          select: {
            id: true,
            name: true,

            _count: { select: { profiles: true } },
          },
        },
        gameProfiles: {
          select: {
            game: {
              select: {
                id: true,
                title: true,
                gameGenders: true,
              },
            },
          },
        },
      },
    });

    if (!record) {
      throw new NotFoundException(
        `Registro com o Id '${id}' não encontrado ou é inválido. `,
      );
    }

    return record;
  }

  async update(id: string, dto: UpdateProfileDto): Promise<Profile> {
    await this.findOne(id);

    const data: Prisma.ProfileUpdateInput = {
      title: dto.title,
      imageUrl: dto.imageUrl,
    };

    return this.prisma.profile
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findOne(id);

    await this.prisma.profile.delete({
      where: { id },
    });
    throw new HttpException('', 204);
  }
    handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1].trim();

    throw new BadRequestException(
      lastErrorLine || 'Opa, ocorreu um pequeno erro, as capivaras da assistencia já estão trabalhando para corrigir. Por favor atualize a pagina e tente novamente.',
    );
  }
}
