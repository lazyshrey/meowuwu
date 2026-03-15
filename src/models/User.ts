import mongoose, { Schema, Document } from 'mongoose';

export interface ILink {
  title: string;
  url: string;
  icon?: string;
  order: number;
  isVisible: boolean;
}

export interface IUser extends Document {
  clerkId: string;
  username: string;
  bio?: string;
  avatarUrl?: string;
  theme: {
    backgroundColor: string;
    cardColor: string;
    textColor: string;
    buttonColor: string;
  };
  links: ILink[];
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  bio: { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
  theme: {
    backgroundColor: { type: String, default: '#FFD1DC' },
    cardColor: { type: String, default: 'rgba(255, 255, 255, 0.4)' },
    textColor: { type: String, default: '#333333' },
    buttonColor: { type: String, default: '#ec5177' },
  },
  links: [
    {
      title: { type: String, required: true },
      url: { type: String, required: true },
      icon: { type: String, default: 'paw' },
      order: { type: Number, default: 0 },
      isVisible: { type: Boolean, default: true },
    },
  ],
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
