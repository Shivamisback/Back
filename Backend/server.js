const errorHandler = require('./middleware/errorHandler');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Redis client setup
const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379
});

// Rate limiter setup
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(limiter);
app.use('/uploads', express.static('uploads'));
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
const userRoutes = require('./routes/authRoutes');
const manhwaRoutes = require('./routes/manhwaRoutes');

app.use('/api/users', userRoutes);
app.use('/api/manhwas', manhwaRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
