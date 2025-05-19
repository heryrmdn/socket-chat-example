import { Router } from 'express'
import { ChatHandler } from '../controller/chat.controller'

const chatRouter = Router()
const chatHandler = ChatHandler()

chatRouter.get('/connect', chatHandler.connectChat)
chatRouter.get('/', chatHandler.listChat)
chatRouter.get('/:id', chatHandler.detailChat)
chatRouter.post('/', chatHandler.createChat)
chatRouter.put('/:id', chatHandler.updateChat)
chatRouter.delete('/:id', chatHandler.deleteChat)

export default chatRouter
