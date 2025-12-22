import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { GetWeatherDto } from './dto/get-weather.dto';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('weather')
export class WeatherController {
    constructor(private service: WeatherService) {}

  @UseGuards(ApiKeyGuard, RolesGuard)
  @Get()
  getWeather(@Query() dto: GetWeatherDto) {
    return this.service.getWeather(dto.city);
  }
}
