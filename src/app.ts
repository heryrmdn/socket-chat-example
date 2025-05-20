import express from 'express'
import router from './routes/index.routes'
import { Api } from './util/api.util'
import morgan from './util/morgan.util'
import { DBConnect } from './config/db.config'

let db = null as any

;(async () => {
  db = await DBConnect()
})().catch((err) => {
  console.error('Failed to connect to DB or start app:', err)
})

const app = express()
const api = Api()

app.use(express.json())
app.use(morgan)

// Router
app.use(router)

// Global Error Handler
app.use(api.responseError)

export { db, app }
