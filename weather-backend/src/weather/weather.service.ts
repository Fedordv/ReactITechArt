import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WeatherCache } from './schemas/weather-cache.schema';
import { Model } from 'mongoose';
import axios from 'axios';
import { ConfigService } from '../config/config.service';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(WeatherCache.name) private cacheModel: Model<WeatherCache>,
    private cfg: ConfigService,
  ) {}

    async getWeather(city: string) {
    const cached = await this.cacheModel.findOne({ city });

    if (cached) {
      return cached.data;
    }

    try {
      const response = await axios.get(
       this.cfg.weatherApiUrl!,
        {
          params: {
            q: city,
            appid: this.cfg.weatherApiKey,
            units: 'metric',
          },
          timeout: 5000,
        },
      );

      await this.cacheModel.findOneAndUpdate(
        { city },
        { data: response.data },
        { upsert: true },
      );

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new BadRequestException('City not found');
      }

      throw new InternalServerErrorException(
        'Failed to fetch weather data',
      );
    }
  }
}
