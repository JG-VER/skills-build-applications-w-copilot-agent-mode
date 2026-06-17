import { Schema, model } from 'mongoose';

export interface ITeam {
  name: string;
  mascot: string;
  memberCount: number;
  weeklyPoints: number;
  captain: string;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    memberCount: { type: Number, required: true },
    weeklyPoints: { type: Number, required: true },
    captain: { type: String, required: true },
  },
  { timestamps: true },
);

export const Team = model<ITeam>('Team', teamSchema);