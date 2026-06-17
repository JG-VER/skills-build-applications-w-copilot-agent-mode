import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const users = [
  {
    username: 'alex_rivera',
    email: 'alex.rivera@example.com',
    fullName: 'Alex Rivera',
    teamName: 'Cardio Crushers',
    fitnessGoal: 'Run a sub-25 minute 5K',
    joinedAt: new Date('2026-01-08T14:30:00Z'),
  },
  {
    username: 'maya_chen',
    email: 'maya.chen@example.com',
    fullName: 'Maya Chen',
    teamName: 'Flex Force',
    fitnessGoal: 'Build upper body strength',
    joinedAt: new Date('2026-01-12T09:15:00Z'),
  },
  {
    username: 'jordan_kim',
    email: 'jordan.kim@example.com',
    fullName: 'Jordan Kim',
    teamName: 'Pace Makers',
    fitnessGoal: 'Complete a sprint triathlon',
    joinedAt: new Date('2026-02-03T18:45:00Z'),
  },
  {
    username: 'samira_patell',
    email: 'samira.patell@example.com',
    fullName: 'Samira Patell',
    teamName: 'Cardio Crushers',
    fitnessGoal: 'Improve weekly consistency',
    joinedAt: new Date('2026-02-16T11:20:00Z'),
  },
];

const teams = [
  {
    name: 'Cardio Crushers',
    mascot: 'Lightning Bolt',
    memberCount: 8,
    weeklyPoints: 4260,
    captain: 'alex_rivera',
  },
  {
    name: 'Flex Force',
    mascot: 'Kettlebell',
    memberCount: 6,
    weeklyPoints: 3895,
    captain: 'maya_chen',
  },
  {
    name: 'Pace Makers',
    mascot: 'Stopwatch',
    memberCount: 7,
    weeklyPoints: 3710,
    captain: 'jordan_kim',
  },
];

const activities = [
  {
    username: 'alex_rivera',
    activityType: 'Outdoor Run',
    durationMinutes: 38,
    caloriesBurned: 410,
    pointsEarned: 95,
    completedAt: new Date('2026-06-15T12:10:00Z'),
  },
  {
    username: 'maya_chen',
    activityType: 'Strength Training',
    durationMinutes: 52,
    caloriesBurned: 360,
    pointsEarned: 110,
    completedAt: new Date('2026-06-15T19:30:00Z'),
  },
  {
    username: 'jordan_kim',
    activityType: 'Cycling',
    durationMinutes: 70,
    caloriesBurned: 680,
    pointsEarned: 140,
    completedAt: new Date('2026-06-16T10:00:00Z'),
  },
  {
    username: 'samira_patell',
    activityType: 'Yoga Flow',
    durationMinutes: 45,
    caloriesBurned: 210,
    pointsEarned: 75,
    completedAt: new Date('2026-06-16T16:45:00Z'),
  },
];

const leaderboard = [
  {
    rank: 1,
    username: 'jordan_kim',
    teamName: 'Pace Makers',
    totalPoints: 2410,
    weeklyActivities: 6,
  },
  {
    rank: 2,
    username: 'maya_chen',
    teamName: 'Flex Force',
    totalPoints: 2295,
    weeklyActivities: 5,
  },
  {
    rank: 3,
    username: 'alex_rivera',
    teamName: 'Cardio Crushers',
    totalPoints: 2180,
    weeklyActivities: 5,
  },
  {
    rank: 4,
    username: 'samira_patell',
    teamName: 'Cardio Crushers',
    totalPoints: 1875,
    weeklyActivities: 4,
  },
];

const workouts = [
  {
    name: '5K Builder Intervals',
    category: 'Running',
    difficulty: 'intermediate' as const,
    durationMinutes: 35,
    targetMuscles: ['quadriceps', 'hamstrings', 'calves'],
    description: 'Alternating tempo intervals designed to improve race pace and aerobic capacity.',
  },
  {
    name: 'Foundational Strength Circuit',
    category: 'Strength',
    difficulty: 'beginner' as const,
    durationMinutes: 30,
    targetMuscles: ['chest', 'back', 'glutes', 'core'],
    description: 'A balanced full-body circuit using simple compound movements.',
  },
  {
    name: 'Triathlon Brick Session',
    category: 'Endurance',
    difficulty: 'advanced' as const,
    durationMinutes: 75,
    targetMuscles: ['quadriceps', 'hamstrings', 'calves', 'core'],
    description: 'Bike-to-run transition workout for improving multisport endurance.',
  },
  {
    name: 'Recovery Mobility Flow',
    category: 'Mobility',
    difficulty: 'beginner' as const,
    durationMinutes: 25,
    targetMuscles: ['hips', 'shoulders', 'spine'],
    description: 'Low-intensity mobility session for recovery days and consistency goals.',
  },
];

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(MONGODB_URI);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const [createdUsers, createdTeams, createdActivities, createdLeaderboard, createdWorkouts] = await Promise.all([
    User.insertMany(users),
    Team.insertMany(teams),
    Activity.insertMany(activities),
    LeaderboardEntry.insertMany(leaderboard),
    Workout.insertMany(workouts),
  ]);

  console.log(`Seeded ${createdUsers.length} users`);
  console.log(`Seeded ${createdTeams.length} teams`);
  console.log(`Seeded ${createdActivities.length} activities`);
  console.log(`Seeded ${createdLeaderboard.length} leaderboard entries`);
  console.log(`Seeded ${createdWorkouts.length} workouts`);
}

seedDatabase()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });