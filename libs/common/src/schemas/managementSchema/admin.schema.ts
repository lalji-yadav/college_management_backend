import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Admin Schema
 * Represents an admin user in the system.
 */
@Schema({timestamps: true, // Automatically adds createdAt & updatedAt fields
  collection: 'admins', // Optional: define custom collection name
})
export class Admin extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'active', enum: ['active', 'inactive'] })
  status: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
