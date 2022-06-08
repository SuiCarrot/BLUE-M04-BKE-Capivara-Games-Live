import { Module } from '@nestjs/common';
import { ProfileGameService } from './profile-games.service';
import { ProfileGameController } from './profile-games.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProfileGameController],
  providers: [ProfileGameService],
})
export class ProfileGameModule {}
