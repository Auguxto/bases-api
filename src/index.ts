import env from 'dotenv';
env.config();
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';

import routes from './routes';

import errorHandler from './middlewares/errorHandler';

const app = express();
const server = http.createServer(app);

// Configure express
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use(routes);

// Middlewares
app.use(errorHandler);

// Start server
server.listen(4000, () => console.log('🚀 Server is runnig...'));
