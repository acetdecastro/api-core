import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';

export type LinkDocument = HydratedDocument<Link>;

@Schema({ versionKey: false, timestamps: true })
export class Link extends AbstractEntity {
  @Prop()
  userId: string;

  @Prop()
  url: string;

  @Prop()
  title?: string;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
