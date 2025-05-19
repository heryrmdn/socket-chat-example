import express from 'express'
import router from './routes/index.routes'
import { Api } from './util/api.util'
import morgan from './util/morgan.util'

const app = express()
const api = Api()

app.use(express.json())
app.use(morgan)

// Router
app.use(router)

// Global Error Handler
app.use(api.responseError)

export default app
