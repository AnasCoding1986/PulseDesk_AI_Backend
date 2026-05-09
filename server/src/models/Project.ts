import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  workspace: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  client?: mongoose.Types.ObjectId;
  status: 'planning' | 'active' | 'review' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'critical';
  health: number;
  startDate: Date;
  dueDate: Date;
  assignedTo: mongoose.Types.ObjectId[];
  tags: string[];
  budget?: number;
  progress: number;
  createdAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    workspace: { type: Schema.Types.ObjectId, ref: 'Workspace', required: true },
    name: { type: String, required: true },
    description: { type: String },
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    status: {
      type: String,
      enum: ['planning', 'active', 'review', 'completed', 'on-hold'],
      default: 'active',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    health: { type: Number, default: 100 },
    startDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    assignedTo: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    tags: [String],
    budget: { type: Number },
    progress: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>('Project', projectSchema);
