import { Server } from 'socket.io'
import { db } from '../app'

export const IOConnect = async (server: any) => {
  const io = new Server(server, {
    connectionStateRecovery: {},
  })

  io.on('connection', (socket) => {
    socket.on('chat message', async (msg) => {
      let result
      try {
        result = await db.run('INSERT INTO messages (content) VALUES (?)', msg)
      } catch (e) {
        return
      }
    })
  })
}
