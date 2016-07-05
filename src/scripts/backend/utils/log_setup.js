var winston = require('winston')

// setup winston loggin 
var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        level:'info',
        colorize: true
        
      }),
      new (winston.transports.File)({
        name: 'file.verbose',
        filename: 'logs/verbose.log',
        level: 'verbose'
        
      }),
      new (winston.transports.File)({
        name: 'file.silly',
        filename: 'logs/silly.log',
        level: 'verbose'
      })
    ]
  });
  
// these 5 globals represent the 6 different levels of logging you can perform
// use the appropiate logging level for your debugging statements.
// all logging levels will go into a file, according to the above logger setup
// only levels of info or higher will be outputed to the console, ( error, warn, info)
global.error = logger.error
global.warn = logger.warn
global.info = logger.info
global.verbose = logger.verbose
global.debug = logger.debug
global.silly = logger.silly

error('testing error loggin')
warn('testing warn loggin')
info('testing info loggin')
verbose('testing debug loggin')
debug('testing verbose loggin')
silly('testing silly loggin')

