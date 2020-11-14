import app from './index';
import colors from 'colors';


const server = app.listen(
  app.get('port'),
  console.log(`Server running in ${app.get('node_env')} on port ${app.get('port')}`.yellow.underline.bold)
);

// Handle Unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
})