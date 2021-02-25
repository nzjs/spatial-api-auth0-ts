/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
// Custom routers
import { PR } from './pois/pois.router';
// import { RR } from './routes/routes.router';
// Middleware
import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/notfound.middleware';

dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1);
}
const port: number = parseInt(process.env.PORT as string, 10);
const app = express();

/**
 *  App Configuration
 */
// Initialise the app
app.use(helmet());
app.use(cors());
app.use(express.json());

// Define the endpoint routers 
app.use('/api/v1/spatial/pois', PR); 
// app.use('/api/v1/spatial/routes', RR); 

// Apply middleware after controller/routers
app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Run the API
 */
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});