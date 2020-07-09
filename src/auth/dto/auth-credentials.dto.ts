import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString({ message: 'Formato de usuario no válido' })
  @MinLength(5, {
    message: 'El usuario debe ser de al menos 5 caracteres',
  })
  @MaxLength(20, {
    message: 'El usuario no debe exceder los 20 caracteres',
  })
  username: string;
  @IsString({ message: 'Formato de contraseña no válido' })
  @MinLength(8, { message: 'La contraseña debe ser de al menos 8 caracteres' })
  password: string;
}
