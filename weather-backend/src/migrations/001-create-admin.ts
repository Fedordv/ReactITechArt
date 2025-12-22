import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserSchema } from '../auth/schemas/user.schema';
import { ConfigService } from '../config/config.service';

const cfg = new ConfigService();

export async function up() {
  await mongoose.connect(
    cfg.mongoUri ?? 'mongodb://127.0.0.1:27017/weather-app',
  );

  const User = mongoose.model('User', UserSchema);

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL or ADMIN_PASSWORD is not defined');
  }

  const exists = await User.findOne({ email });
  if (exists) {
    console.log('Admin already exists');
    process.exit(0);
  }

  const hash = await bcrypt.hash(password, 10);

  await User.create({
    email,
    password: hash,
    role: 'admin',
  });

  console.log('Admin created');
  process.exit(0);
}

export async function down() {
  await mongoose.connect(
    cfg.mongoUri ?? 'mongodb://127.0.0.1:27017/weather-app',
  );

  await mongoose.connection
    .collection('users')
    .deleteOne({ email: process.env.ADMIN_EMAIL });

  console.log('Admin removed');
  process.exit(0);
}
