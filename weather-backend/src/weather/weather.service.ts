import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { WeatherCache } from './schemas/weather-cache.schema';
import { ConfigService } from '@/config/config.service';

function isAxiosLikeError(
  error: unknown,
): error is { response?: { status?: number } } {
  return typeof error === 'object' && error !== null && 'response' in error;
}

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(WeatherCache.name) private cacheModel: Model<WeatherCache>,
    private cfg: ConfigService,
  ) {}

  async getWeather(city: string) {
    const cached = await this.cacheModel.findOne({ city });
    if (cached) return cached.data;

    try {
      const response = await axios.get(this.cfg.weatherApiUrl!, {
        params: {
          q: city,
          appid: this.cfg.weatherApiKey,
          units: 'metric',
        },
        timeout: 5000,
      });

      await this.cacheModel.findOneAndUpdate(
        { city },
        { data: response.data },
        { upsert: true },
      );

      return response.data;
    } catch (error: unknown) {
      if (isAxiosLikeError(error) && error.response?.status === 404) {
        throw new BadRequestException('City not found');
      }

      throw new InternalServerErrorException('Failed to fetch weather data');
    }
  }
}
