import { Schema, model } from 'mongoose';

export interface IWorkout {
  name: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  targetMuscles: string[];
  description: string;
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true },
    targetMuscles: [{ type: String, required: true }],
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export const Workout = model<IWorkout>('Workout', workoutSchema);