import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherCache, WeatherCacheSchema } from './schemas/weather-cache.schema';
import { Model, Mongoose } from 'mongoose';
import { ConfigModule } from '../config/config.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
        CacheModule.register({
        ttl: 3000, 
         max: 100,
        isGlobal: true,
        }),
        MongooseModule.forFeature([
            {name: WeatherCache.name, schema: WeatherCacheSchema}
        ]),
        ConfigModule,
    ],
    controllers: [WeatherController],
    providers: [WeatherService]
})

export class WeatherModule {};