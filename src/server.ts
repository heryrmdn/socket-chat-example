import { createServer } from 'node:http'
import app from './app'
import config from './config/config'
import { ErrorHandler } from './util/error.util'
import { Server } from 'socket.io'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const errorHandler = ErrorHandler()
const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery: {},
})

// Socket.io
io.on('connection', (socket) => {
  socket.on('request', async (msg, callback) => {
    if (!msg) {
      alert('Error')
    }

    try {
      const response = await socket.timeout(5000).emitWithAck('response', msg)

      console.log('response: ', response)
    } catch (err) {
      console.error('err: ', err)
    }

    callback({
      status: 200,
      message: 'OK',
      data: msg,
    })
  })
})

server.listen(config.app_port, () => {
  console.log(`server running at http://${config.app_host}:${config.app_port}`)

  process.on('unhandledRejection', errorHandler.handleFatalError)
  // process.on('SIGTERM', errorHandler.handleFatalError)
})

export default server
