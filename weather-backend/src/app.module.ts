import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DataBaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    ConfigModule,
    DataBaseModule, 
    AuthModule, 
    WeatherModule],
})
export class AppModule {}
