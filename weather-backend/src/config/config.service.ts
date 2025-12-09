import * as dotenv from 'dotenv';
dotenv.config();

export class ConfigService {
  readonly port = process.env.PORT;
  readonly mongoUri = process.env.MONGO_URI;
  readonly jwtSecret = process.env.JWT_SECRET;
  readonly apiKey = process.env.API_KEY;
  readonly weatherApiKey = process.env.WEATHER_API_KEY;
}
