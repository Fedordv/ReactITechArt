import * as dotenv from 'dotenv';
dotenv.config();

export class ConfigService {
  readonly port = process.env.PORT || '5000';
  readonly mongoUri = process.env.MONGO_URI!;
  readonly jwtSecret = process.env.JWT_SECRET!;
  readonly jwtExpiresIn = Number(process.env.JWT_EXPIRES_IN ?? 604800);
  readonly apiKey = process.env.API_KEY!;
  readonly weatherApiKey = process.env.WEATHER_API_KEY!;
  readonly weatherApiUrl = process.env.WEATHER_API_URL;
}
