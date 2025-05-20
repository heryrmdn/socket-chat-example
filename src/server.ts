import { createServer } from 'node:http'
import { ErrorHandler } from './util/error.util'
import { IOConnect } from './config/io.config'
import config from './config/config'
import { app } from './app'

const errorHandler = ErrorHandler()
const server = createServer(app)
const io = IOConnect(server)

server.listen(config.app_port, () => {
  console.log(`server running at http://${config.app_host}:${config.app_port}`)

  process.on('unhandledRejection', errorHandler.handleFatalError)
  // process.on('SIGTERM', errorHandler.handleFatalError)
})

export { io }
