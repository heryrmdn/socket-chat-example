import { Server } from 'socket.io'
import { db } from '../app'
import { createAdapter, setupPrimary } from '@socket.io/cluster-adapter'
import { availableParallelism } from 'node:os'
import cluster from 'node:cluster'

export const IOConnect = async (server: any) => {
  if (cluster.isPrimary) {
    const numCPUs = availableParallelism()
    console.log('numCPUs: ', numCPUs)

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork({
        PORT: 3000 + i,
      })
    }
    setupPrimary()
  }

  const io = new Server(server, {
    connectionStateRecovery: {},
    adapter: createAdapter(),
  })

  io.on('connection', async (socket) => {
    socket.on('chat message', async (msg) => {
      let result
      try {
        result = await db.run('INSERT INTO messages (content) VALUES (?)', msg)
      } catch (e) {
        return
      }
      io.emit('chat message', msg, result.lastID)
    })

    if (!socket.recovered) {
      try {
        await db.each(
          'SELECT id, content FROM messages WHERE id > ?',
          [socket.handshake.auth.serverOffset],
          (_err: any, row: any) => {
            socket.emit('chat message', row.content, row.id)
          },
        )
      } catch (error) {}
    }
  })
}
