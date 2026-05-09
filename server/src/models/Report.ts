import mongoose, { Schema, Document } from 'mongoose';

export interface IReport extends Document {
  workspace: mongoose.Types.ObjectId;
  project?: mongoose.Types.ObjectId;
  client?: mongoose.Types.ObjectId;
  generatedBy: mongoose.Types.ObjectId;
  title: string;
  content: string;
  type: 'weekly' | 'monthly' | 'client' | 'performance';
  period: { from: Date; to: Date };
  status: 'draft' | 'sent' | 'archived';
  createdAt: Date;
}

const reportSchema = new Schema<IReport>(
  {
    workspace: { type: Schema.Types.ObjectId, ref: 'Workspace', required: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    generatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: {
      type: String,
      enum: ['weekly', 'monthly', 'client', 'performance'],
      default: 'monthly',
    },
    period: {
      from: { type: Date, required: true },
      to: { type: Date, required: true },
    },
    status: {
      type: String,
      enum: ['draft', 'sent', 'archived'],
      default: 'draft',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IReport>('Report', reportSchema);
