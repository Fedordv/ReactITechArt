import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';

describe('Auth API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(() => app.close());

  it('/auth/register (POST) — создаём нового пользователя', async () => {
    const email = `test${Date.now()}@test.com`;

    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password: '123456' })
      .expect(201);

    expect(res.body).toHaveProperty('message', 'User created');
    expect(res.body).toHaveProperty('id');
  });

  it('/auth/login (POST) — существующий пользователь', async () => {
    const email = 'test1765293408662@test.com';
    const password = '123456'; 

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password })
      .expect(200);

    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
  });
});
