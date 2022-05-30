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

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProfileDto): Promise<Profile> {
    const data: Profile = { ...dto };

    return this.prisma.profile.create({ data }).catch(this.handleError);
  }

  async findAll(): Promise<Profile[]> {
    const list = await this.prisma.profile.findMany();

    if (list.length === 0) {
      throw new NotFoundException('Não existem perfis cadastrados ainda, que tal ser o primeiro a cadastrar um?.');
    }
    return list;
  }

  async findOne(id: string) {
    const record = await this.prisma.profile.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(
        `O perfil com o Id: '${id}' não existe em nosso banco de dados. `,
      );
    }

    return record;
  }

  async update(id: string, dto: UpdateProfileDto): Promise<Profile> {
    await this.findOne(id);

    const data: Partial<Profile> = { ...dto };

    return this.prisma.profile
      .update({
        where: { id },
        data,
      })
      .catch(this.handleError);
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
