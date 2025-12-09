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
    if (!city) throw new Error('City is required');

    const cached = await this.cacheModel.findOne({ city });
    if (cached && cached.updatedAt > new Date(Date.now() - 60000)) {
      return cached.data;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city,
      )}&appid=${this.cfg.weatherApiKey}&units=metric`;

      console.log('Request URL:', url);

      const { data } = await axios.get(url);

   
      await this.cacheModel.findOneAndUpdate(
        { city },
        { data, updatedAt: new Date() },
        { upsert: true },
      );

      return data;
    } catch (err: any) {
      console.error('Weather API Error:', err.response?.data || err.message);
      throw new Error('Failed to fetch weather');
    }
  }
}
