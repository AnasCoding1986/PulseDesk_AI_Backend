import mongoose, { Schema, Document } from 'mongoose';

export interface IClient extends Document {
  workspace: mongoose.Types.ObjectId;
  name: string;
  company: string;
  email: string;
  phone?: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'lead' | 'churned';
  totalRevenue: number;
  projects: mongoose.Types.ObjectId[];
  tags: string[];
  createdAt: Date;
}

const clientSchema = new Schema<IClient>(
  {
    workspace: { type: Schema.Types.ObjectId, ref: 'Workspace', required: true },
    name: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    avatar: { type: String },
    status: {
      type: String,
      enum: ['active', 'inactive', 'lead', 'churned'],
      default: 'active',
    },
    totalRevenue: { type: Number, default: 0 },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    tags: [String],
  },
  { timestamps: true }
);

export default mongoose.model<IClient>('Client', clientSchema);
