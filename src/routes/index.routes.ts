import { Router } from 'express'
import itemRouter from './item.routes'
import chatRouter from './chat.routes'

const router = Router()

router.use('/item', itemRouter)
router.use('/chat', chatRouter)

export default router
