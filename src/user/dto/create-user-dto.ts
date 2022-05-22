import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateUserDto {
  @Length(3, 12)
  @ApiProperty({
    description: 'O nome do usuãrio deve conter entre 3 e 12 caracteres.',
    example: 'Robson',
  })
  name: string;
}
