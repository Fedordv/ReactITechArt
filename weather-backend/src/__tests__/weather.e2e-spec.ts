// src/__tests__/weather.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { WeatherController } from '@/weather/weather.controller';
import { WeatherService } from '@/weather/weather.service';
import { ApiKeyGuard } from '@/common/guards/api-key.guard';
import { ConfigService } from '@/config/config.service';

describe('Weather API (e2e)', () => {
  let app: INestApplication;
  let mockWeatherService = {
    getWeather: (city: string) => ({
      temperature: 25,
      condition: 'Sunny',
      city,
    }),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [
        { provide: WeatherService, useValue: mockWeatherService },
        ConfigService,
      ],
    })
      .overrideGuard(ApiKeyGuard)
      .useValue({
        canActivate: () => true, 
      })
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/weather?city=Minsk (GET) should return weather', async () => {
    const res = await request(app.getHttpServer())
      .get('/weather?city=Minsk')
      .expect(200);

    expect(res.body).toHaveProperty('temperature');
    expect(res.body).toHaveProperty('condition');
    expect(res.body.city).toBe('Minsk');
  });
});
