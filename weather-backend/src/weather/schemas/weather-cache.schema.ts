import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true, expires: 60})
export class WeatherCache extends Document {
  @Prop({ required: true })
  city: string;

  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  data: any;
}

export const WeatherCacheSchema = SchemaFactory.createForClass(WeatherCache);
