import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateFinishedTaskDto {
    @IsNotEmpty()
    @IsBoolean()
    done: boolean;

}
