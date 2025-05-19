import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const fileFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.uncolorize(),
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  winston.format.prettyPrint({
    depth: 5,
  }),
  winston.format.printf(
    (info: any) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
)

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  winston.format.prettyPrint({
    depth: 5,
  }),
  winston.format.printf(
    (info: any) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
)

const consoleTransport = new winston.transports.Console({
  format: consoleFormat
})

const combinedFileTransport = new DailyRotateFile({
  filename: '%DATE%_combined.log',
  format: fileFormat,
  datePattern: 'YYYY-MM-DD-HH',
  maxSize: '2m',
  dirname: './logs/combined',
  maxFiles: '14d'
})

const errorFileTransport = new DailyRotateFile({
  filename: '%DATE%_error.log',
  level: 'error',
  format: fileFormat,
  datePattern: 'YYYY-MM-DD-HH',
  maxSize: '2m',
  dirname: './logs/errors',
  maxFiles: '14d'
})

const httpTransport = new winston.transports.Http({
  format: winston.format.json(), 
  host: 'localhost',
  port: 4000,
  path: '/logs',
  ssl: false,
  batch: true,
  batchCount: 10,
  batchInterval: 10000
})

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [
    consoleTransport
  ]
})

export default logger
