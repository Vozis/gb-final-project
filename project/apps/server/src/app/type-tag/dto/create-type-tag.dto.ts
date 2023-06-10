import { IsString } from "class-validator";

export class CreateTypeTagDto {
  @IsString()
  name: string
}
