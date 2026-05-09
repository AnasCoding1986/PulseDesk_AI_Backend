import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkspace extends Document {
  name: string;
  slug: string;
  logo?: string;
  owner: mongoose.Types.ObjectId;
  members: {
    user: mongoose.Types.ObjectId;
    role: 'admin' | 'member' | 'viewer';
  }[];
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: Date;
}

const workspaceSchema = new Schema<IWorkspace>(
  {
    name: { type: String, required: [true, 'Workspace must have a name'] },
    slug: { type: String, required: true, unique: true },
    logo: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        role: { type: String, enum: ['admin', 'member', 'viewer'], default: 'member' },
      },
    ],
    plan: { type: String, enum: ['free', 'pro', 'enterprise'], default: 'free' },
  },
  { timestamps: true }
);

export default mongoose.model<IWorkspace>('Workspace', workspaceSchema);
