import dotenv from 'dotenv';
import http from 'http';
import { app } from './app';

// load environmental variables from .env
dotenv.config();

// create server using the express app
const server = http.createServer(app);

// start server on the port specified in the environment variables
server.listen(process.env.PORT, () => {
  console.log(`Poptart server listening on port ${process.env.PORT}!`);
});
