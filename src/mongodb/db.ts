import dotenv from 'dotenv';
import mongoose from 'mongoose';

// load environmental variables
dotenv.config();

// build the mongodb url\
let url = `mongodb://127.0.0.1:27017/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;
if (process.env.NODE_ENV === 'production')
  url = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@editor0.htefm.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

// connect to mongoDB
mongoose.connect(url, {
  // these are the options recommended by the mongoose documentation
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

import './attendance.db';
import './patrols.db';
import './profiles.db';
