import { Module } from '@nestjs/common';
import { ProfileGameService } from './profile-games.service';
import { ProfileGameController } from './profile-games.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ProfileGameController],
  providers: [ProfileGameService],
})
export class ProfileGameModule {}
