import errorHandler from 'errorhandler';

import app from './app';

const debug = require('debug')('express-es6:server');

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${app.get('port')}`
    : `Port ${app.get('port')}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      debug(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      debug(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'));

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  const env = app.get('env');

  debug(`Running at ${bind} in ${env} mode`);
};

server.on('error', onError);
server.on('listening', onListening);

export default server;
