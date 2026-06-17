import { Schema, model } from 'mongoose';

export interface ILeaderboardEntry {
  rank: number;
  username: string;
  teamName: string;
  totalPoints: number;
  weeklyActivities: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    rank: { type: Number, required: true, unique: true },
    username: { type: String, required: true },
    teamName: { type: String, required: true },
    totalPoints: { type: Number, required: true },
    weeklyActivities: { type: Number, required: true },
  },
  { timestamps: true },
);

export const LeaderboardEntry = model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema, 'leaderboard');