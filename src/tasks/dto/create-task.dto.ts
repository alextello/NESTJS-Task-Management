import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'El título no puede estar vació' })
  title: string;
  @IsNotEmpty({ message: 'Debe agregar una descripción' })
  description: string;
}
