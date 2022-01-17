import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Group } from '../../groups/schemas/group.schema';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true, })
export class Task {

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  done: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Group' })
  group: Group;

}

export const TaskSchema = SchemaFactory.createForClass(Task);