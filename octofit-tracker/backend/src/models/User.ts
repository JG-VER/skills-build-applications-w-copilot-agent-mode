import { Schema, model } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  fullName: string;
  teamName: string;
  fitnessGoal: string;
  joinedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    teamName: { type: String, required: true },
    fitnessGoal: { type: String, required: true },
    joinedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export const User = model<IUser>('User', userSchema);