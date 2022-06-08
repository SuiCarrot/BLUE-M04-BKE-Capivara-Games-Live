import { ApiProperty } from '@nestjs/swagger';
import { Length, IsEmail, MinLength, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @Length(3, 12)
  @ApiProperty({
    description: 'O nome do usuário deve conter entre 3 e 12 caracteres.',
    example: 'Robson',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'Email do usuário para login.',
    example: 'robson.robnilson@gmail.com',
  })
  email: string;

  @MinLength(6)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'senha muito fraca',
  })
  @ApiProperty({
    description:
      'Senha do usuário para login. Necessário letras maiúsculas e minúsculas, número e caracter especial.',
    example: 'BatataGrandee2Coca!',
  })
  password: string;

  @ApiProperty({
    description: 'A confirmação da senha deve ser igual a senha.',
    example: 'BatataGrandee2Coca!',
  })
  confirmPassword: string;

  @Length(11, 11)
  @Matches(/^[0-9]*$/, {
    message: 'CPF inválido.',
  })
  @ApiProperty({
    description: 'CPF do usuário, somente números.',
    example: '15676482950',
  })
  cpf: string;

  @ApiProperty({
    description: 'Declaração de Adm.',
    example: false,
  })
  isAdmin: boolean;
}
