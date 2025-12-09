import mongoose from 'mongoose';
import { UserSchema } from '../auth/schemas/user.schema';
import bcrypt from 'bcryptjs';
import { ConfigService } from '../config/config.service';

const cfg = new ConfigService();

export async function up() {
  await mongoose.connect(cfg.mongoUri ?? 'mongodb://127.0.0.1:27017/weather-app');

  const User = mongoose.model('User', UserSchema);

  const exists = await User.findOne({ email: 'admin@admin.com' });
  if (exists) {
    console.log('Admin already exists');
    process.exit(0);
  }

  const hash = await bcrypt.hash('admin123', 10);

  await User.create({
    email: 'admin@admin.com',
    password: hash,
    role: 'admin',
  });

  console.log('Admin created');
  process.exit(0);
}
