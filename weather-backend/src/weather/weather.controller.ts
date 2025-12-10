import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { GetWeatherDto } from './dto/get-weather.dto';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@Controller('weather')
export class WeatherСontroller {
    constructor(private service: WeatherService) {}

  // @UseGuards(ApiKeyGuard)
  @Get()
  getWeather(@Query() dto: GetWeatherDto) {
    return this.service.getWeather(dto.city);
  }
}
