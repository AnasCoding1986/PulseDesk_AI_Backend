import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  project: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee?: mongoose.Types.ObjectId;
  dueDate?: Date;
  order: number;
  labels: string[];
  createdAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'review', 'done'],
      default: 'todo',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    assignee: { type: Schema.Types.ObjectId, ref: 'User' },
    dueDate: { type: Date },
    order: { type: Number, default: 0 },
    labels: [String],
  },
  { timestamps: true }
);

export default mongoose.model<ITask>('Task', taskSchema);
