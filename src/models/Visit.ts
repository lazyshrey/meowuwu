import mongoose, { Schema, Document } from 'mongoose';

export interface IVisit extends Document {
  username: string; // The profile being visited
  visitorId: string; // Hashed ID or UUID of the visitor
  createdAt: Date;
}

const VisitSchema: Schema = new Schema({
  username: { type: String, required: true, index: true },
  visitorId: { type: String, required: true },
}, { timestamps: { createdAt: true, updatedAt: false } });

// Compound index to quickly check if a visitor has already visited this profile
VisitSchema.index({ username: 1, visitorId: 1 }, { unique: true });

export default mongoose.models.Visit || mongoose.model<IVisit>('Visit', VisitSchema);
