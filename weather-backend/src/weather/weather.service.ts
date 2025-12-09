import { Injectable } from '@nestjs/common';
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

  if (cached && cached.updatedAt > new Date(Date.now() - 60000)) {
    return cached.data;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.cfg.weatherApiKey}&units=metric`;
  const response = await axios.get(url);

  await this.cacheModel.findOneAndUpdate(
    { city },
    { data: response.data, updatedAt: new Date() },
    { upsert: true }
  );

  return response.data;
}
}
