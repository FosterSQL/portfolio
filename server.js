import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import config from './config/config.js';
import assetsRouter from './server/assets-router.js';
import projectRoutes from './server/routes/project.routes.js';
import contactRoutes from './server/routes/contact.routes.js';
import userRoutes from './server/routes/user.routes.js';
import qualificationRoutes from './server/routes/qualification.routes.js';
import authRoutes from './server/routes/auth.routes.js';

const app = express();

// Minimal middleware - ensure parsers/cors are registered before routes
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Mount auth routes after middleware so req.body and req.cookies are available for signin and auth
app.use('/', authRoutes);

// MongoDB connection (simple and explicit)
mongoose.Promise = global.Promise;
mongoose.connect(config.db || 'mongodb://localhost:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully.');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Static/assets router (if used by client)
app.use('/src', assetsRouter);

// API routes
app.use('/', projectRoutes);
app.use('/', contactRoutes);
app.use('/', userRoutes);
app.use('/', qualificationRoutes);

// Health / base route
app.get('/', (req, res) => res.json({ message: 'Welcome to My portfolio' }));

// Simple error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Start server
const PORT = config.port || process.env.PORT || 3000;
app.listen(PORT, () => {
  console.info(`Server running at http://localhost:${PORT}`);
});

export default app;