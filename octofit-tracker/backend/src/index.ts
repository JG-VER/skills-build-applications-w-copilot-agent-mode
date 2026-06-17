import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database';
import { User } from './models/User';
import { Team } from './models/Team';
import { Activity } from './models/Activity';
import { LeaderboardEntry } from './models/Leaderboard';
import { Workout } from './models/Workout';

const app = express();
const PORT = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
connectDatabase()
  .then(() => {
    console.log('✓ Connected to MongoDB');
  })
  .catch((error) => {
    console.error('✗ MongoDB connection error:', error);
    process.exit(1);
  });

// Health Check Route
app.get('/health', (_req, res) => {
  res.json({ status: 'Backend is running', timestamp: new Date().toISOString() });
});

// API Routes
app.get('/api', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API v1.0.0', baseUrl });
});

app.get('/api/users/', async (_req, res, next) => {
  try {
    const users = await User.find().sort({ username: 1 });
    res.json({ resource: 'users', baseUrl, data: users });
  } catch (error) {
    next(error);
  }
});

app.get('/api/teams/', async (_req, res, next) => {
  try {
    const teams = await Team.find().sort({ weeklyPoints: -1 });
    res.json({ resource: 'teams', baseUrl, data: teams });
  } catch (error) {
    next(error);
  }
});

app.get('/api/activities/', async (_req, res, next) => {
  try {
    const activities = await Activity.find().sort({ completedAt: -1 });
    res.json({ resource: 'activities', baseUrl, data: activities });
  } catch (error) {
    next(error);
  }
});

app.get('/api/leaderboard/', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 });
    res.json({ resource: 'leaderboard', baseUrl, data: leaderboard });
  } catch (error) {
    next(error);
  }
});

app.get('/api/workouts/', async (_req, res, next) => {
  try {
    const workouts = await Workout.find().sort({ difficulty: 1, name: 1 });
    res.json({ resource: 'workouts', baseUrl, data: workouts });
  } catch (error) {
    next(error);
  }
});

// Error Handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on ${baseUrl}`);
});
