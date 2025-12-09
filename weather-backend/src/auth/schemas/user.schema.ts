import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
    @Prop({unique: true})
    email: string;

    @Prop()
    password: string

    @Prop({default: 'admin'})
    role: string
}

export const UserSchema = SchemaFactory.createForClass(User);