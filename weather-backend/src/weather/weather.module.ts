import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';

import { ConfigModule } from '@/config/config.module';

import { WeatherCache, WeatherCacheSchema } from './schemas/weather-cache.schema';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

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