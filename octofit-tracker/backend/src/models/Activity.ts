import { Schema, model } from 'mongoose';

export interface IActivity {
  username: string;
  activityType: string;
  durationMinutes: number;
  caloriesBurned: number;
  pointsEarned: number;
  completedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    username: { type: String, required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    pointsEarned: { type: Number, required: true },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export const Activity = model<IActivity>('Activity', activitySchema);