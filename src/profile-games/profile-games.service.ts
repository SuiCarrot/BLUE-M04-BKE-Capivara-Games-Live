import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileGameDto } from './dto/create-profile-game';
import { UpdateProfileGameDto } from './dto/update-profile-game';
import { handleError } from 'src/utils/handle-error';
import { notFoundError } from '../utils/not-found';

@Injectable()
export class ProfileGameService {
  constructor(private readonly prisma: PrismaService) {}

  async addGame(dto: CreateProfileGameDto) {
    const data: Prisma.GameProfileCreateInput = {
      game: { connect: { id: dto.gameId } },
      profile: { connect: { id: dto.profileId } },
      favorite: dto.favorite,
    };

    return await this.prisma.gameProfile
      .create({
        data,
        select: {
          game: {
            select: {
              id: true,
              title: true,
            },
          },
          profile: {
            select: {
              id: true,
              title: true,
            },
          },
          favorite: true,
        },
      })
      .catch(handleError);
  }

  async findOneProfile(profileId: string) {
    const record = await this.prisma.gameProfile.findMany({
      where: { profileId },
      select: {
        id: true,
        game: {
          select: {
            title: true,
            year: true,
            genders: {
              select: {
                name: true,
              },
            },
          },
        },
        favorite: true,
      },
    });

    console.log(record);

    notFoundError(record, profileId);

    return record;
  }

  async updateFav(id, dto: UpdateProfileGameDto) {
    const record = await this.prisma.gameProfile.findUnique({
      where: { id },
    });

    notFoundError(record, id);

    const data: Prisma.GameProfileUpdateInput = {
      favorite: dto.favorite,
    };

    return this.prisma.gameProfile
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async delete(id) {
    const record = await this.prisma.gameProfile.findUnique({
      where: { id },
    });

    notFoundError(record, id);

    await this.prisma.gameProfile.delete({
      where: { id },
    });
    throw new HttpException('Jogo deletado com sucesso.', 204);
  }
}
