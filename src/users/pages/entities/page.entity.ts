import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';

export type PageDocument = HydratedDocument<Page>;

@Schema({ versionKey: false, timestamps: true })
export class Page extends AbstractEntity {
  @Prop()
  userId: string;

  @Prop()
  uri: string;

  @Prop()
  name: string;
}

export const PageSchema = SchemaFactory.createForClass(Page);
