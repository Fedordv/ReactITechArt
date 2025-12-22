import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../enums/role.enum';

@Schema()
export class User {
    @Prop({unique: true})
    email: string;

    @Prop()
    password: string

    @Prop({ enum: Role, default: Role.USER })
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);