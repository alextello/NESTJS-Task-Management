import { TaskStatus } from '../task.model';
import {
  IsOptional,
  IsIn,
  IsNotEmpty,
  ValidationArguments,
} from 'class-validator';
export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE], {
    message: (args: ValidationArguments): any => {
      return (
        'El status ' + args.value + ' No es válido'
        // 'El status debe ser uno de los siguientes ' + args.constraints[0]
      );
    },
  })
  status: TaskStatus;
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
