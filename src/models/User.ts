import mongoose, { Schema, Document } from 'mongoose';

export interface ILink {
  title: string;
  url: string;
  icon?: string;
  order: number;
  isVisible: boolean;
  variant?: 'primary' | 'secondary';
  clicks?: number;
}

export interface IUser extends Document {
  clerkId: string;
  username: string;
  bio?: string;
  avatarUrl?: string;
  socials?: {
    instagram?: string;
    x?: string;
    youtube?: string;
    tiktok?: string;
    github?: string;
    discord?: string;
  };
  seo?: {
    title?: string;
    description?: string;
  };
  views?: number;
  uniqueViews?: number;
  showBranding?: boolean;
  theme: {
    backgroundColor: string;
    cardColor: string;
    textColor: string;
    buttonColor: string;
    font?: string;
    socialPosition?: 'top' | 'bottom';
  };
  links: ILink[];
  isActive?: boolean;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  bio: { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
  socials: {
    instagram: { type: String, default: '' },
    x: { type: String, default: '' },
    youtube: { type: String, default: '' },
    tiktok: { type: String, default: '' },
    github: { type: String, default: '' },
    discord: { type: String, default: '' },
  },
  seo: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  views: { type: Number, default: 0 },
  uniqueViews: { type: Number, default: 0 },
  showBranding: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
  theme: {
    backgroundColor: { type: String, default: '#FFD1DC' },
    cardColor: { type: String, default: 'rgba(255, 255, 255, 0.4)' },
    textColor: { type: String, default: '#333333' },
    buttonColor: { type: String, default: '#ec5177' },
    font: { type: String, default: 'Inter' },
    socialPosition: { type: String, enum: ['top', 'bottom'], default: 'top' },
  },
  links: [
    {
      title: { type: String, required: true },
      url: { type: String, required: true },
      icon: { type: String, default: 'paw' },
      order: { type: Number, default: 0 },
      isVisible: { type: Boolean, default: true },
      variant: { type: String, enum: ['primary', 'secondary'], default: 'primary' },
      clicks: { type: Number, default: 0 },
    },
  ],
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
