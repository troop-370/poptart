// create express app
import express from 'express';
const app = express();

// connect to the database
import './mongodb/db';

// return JSON in a pretty printed format
app.set('json spaces', 2);

// use Node's built-in simpler query parser
// queries will either be a string or an array of strings
app.set('query parser', 'simple');

// make queries available as an instance of `URLSearchParams` via `req.search`
import { queryToSearchParams } from './middleware/queryToSearchParams';
app.use(queryToSearchParams);

// parse incoming request body as applciation/json
app.use(express.json());

// send a ready message if a user navigates to the api url
app.get('/', (req, res) => {
  res.status(200).json({ status: 'Ready' });
});

// add patrols routes
import { patrolsRouter } from './api/routes/patrols.route';
app.use('/patrols', patrolsRouter);

// add attendance sheets routes
import { attendanceRouter } from './api/routes/attendance.route';
app.use('/attendance', attendanceRouter);

// add profiles routes
import { profilesRouter } from './api/routes/profiles.route';
app.use('/profiles', profilesRouter);

export { app };
