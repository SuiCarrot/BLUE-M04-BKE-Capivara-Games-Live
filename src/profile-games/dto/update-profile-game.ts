import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

class FavUpdate {
  @IsBoolean()
  @ApiProperty({
    description: 'Favorita o jogo aquele perfil.',
    example: true,
  })
  favorite: boolean;
}

export class UpdateProfileGameDto extends PartialType(FavUpdate) {}
