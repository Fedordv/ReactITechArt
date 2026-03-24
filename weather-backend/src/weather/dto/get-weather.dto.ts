import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class GetWeatherDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  @Matches(/^[a-zA-Z\s-]+$/, {
    message: 'City name contains invalid characters',
  })
  city: string;
}