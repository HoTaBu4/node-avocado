import serverlessHttp from 'serverless-http';
import app from '../index.js';

export default serverlessHttp(app);
