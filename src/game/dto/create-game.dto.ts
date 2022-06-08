import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, IsUrl } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do jogo.',
    example: 'Stellaris',
  })
  title: string;

  @IsUrl()
  @ApiProperty({
    description: 'Imagem para capa do jogo, em URL',
    example:
      'https://cdn.cloudflare.steamstatic.com/steam/apps/281990/capsule_616x353.jpg?t=1652979714',
  })
  coverImageUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Descrição do jogo.',
    example:
      'Stellaris is a sci-fi grand strategy game set 200 years into the future. It is developed by Paradox Development Studio and published by Paradox Interactive.',
  })
  description: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Ano de lançamento do jogo.',
    example: 2016,
  })
  year: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Score no IMDB',
    example: 8.7,
  })
  imdbScore: number;

  @IsUrl()
  @ApiProperty({
    description: 'Trailer do Jogo.',
    example: 'https://youtu.be/zzNs4-kRLaE',
  })
  trailerYouTubeUrl: string;

  @IsUrl()
  @ApiProperty({
    description: 'Gameplay do Jogo.',
    example: 'https://www.youtube.com/watch?v=P2tfSh0cw8E',
  })
  gameplayYouTubeUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Genero dos jogos',
    example: 'Ação',
  })
  genders: string;
}
