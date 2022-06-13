import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsUUID, Length } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @Length(3, 12)
  @ApiProperty({
    description: 'Nome do perfil. Deve conter de 3 a 12 letras',
    example: 'MultiRobson',
  })
  title: string;

  @IsUrl()
  @ApiProperty({
    description: 'Foto do perfil. Deve ser uma URL.',
    example:
      'https://cdn.dribbble.com/users/1786581/screenshots/4159729/media/12f472eca93f1701d57514e5cadeebb6.png?compress=1&resize=400x300',
  })
  imageUrl: string;

  @IsUUID()
  @ApiProperty({
    description: 'Id do Usuário detentor do perfil.',
    example: 'Usuário 06',
  })
  userId: string;
}
