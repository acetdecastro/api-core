import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true })
export class User extends AbstractEntity {
  @Prop({ unique: true })
  email: string;

  @Prop({ unique: true, index: true })
  username: string;

  @Prop({ required: false })
  name?: string;

  @Prop({ required: false })
  image?: string;

  @Prop()
  password: string;

  @Prop({ required: false })
  emailVerified: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
