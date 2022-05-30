import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateGenderDto {
  @IsString()
  @ApiProperty({
    description: 'Adicione um um novo gênero',
    example: 'Grand Strategy',
  })
  name: string;
}
