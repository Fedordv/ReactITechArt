import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserSchema } from '../auth/schemas/user.schema';
import { Role } from '../auth/enums/role.enum';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not set`);
  }
  return value;
}

const mongoUri = requireEnv('MONGO_URI');
const ADMIN_EMAIL = requireEnv('ADMIN_EMAIL');
const ADMIN_PASSWORD = requireEnv('ADMIN_PASSWORD');

function getUserModel() {
  return mongoose.models.User || mongoose.model('User', UserSchema);
}

export async function up() {
  await mongoose.connect(mongoUri);

  const User = getUserModel();

  const exists = await User.findOne({ email: ADMIN_EMAIL });
  if (exists) {
    console.log('Admin already exists');
    await mongoose.disconnect();
    return;
  }

  const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);

  await User.create({
    email: ADMIN_EMAIL,
    password: hash,
    role: Role.ADMIN,
  });

  console.log('Admin created');

  await mongoose.disconnect();
}

export async function down() {
  await mongoose.connect(mongoUri);

  const User = getUserModel();
  await User.deleteOne({ email: ADMIN_EMAIL });

  console.log(' Admin removed');

  await mongoose.disconnect();
}

if (require.main === module) {
  const action = process.argv[2];
  if (action === 'down') {
    down().catch(console.error);
  } else {
    up().catch(console.error);
  }
}
