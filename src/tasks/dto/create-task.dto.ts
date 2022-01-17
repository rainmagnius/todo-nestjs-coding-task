import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(64)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(256)
    description: string;

}
