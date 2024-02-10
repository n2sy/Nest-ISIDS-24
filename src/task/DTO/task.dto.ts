import {
  IsIn,
  IsNotEmpty,
  IsPositive,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class AddTaskDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Longueur du title supérieur à 6 caractères',
  })
  public title: string;

  @IsPositive()
  @Min(2020)
  @Max(2026)
  public year: number;

  @IsString()
  @IsIn(['todo', 'in progress'])
  public statut: string;
}
