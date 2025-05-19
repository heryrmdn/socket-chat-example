import { Router } from 'express'
import { ItemHandler } from '../controller/item.controller'

const itemRouter = Router()
const itemHandler = ItemHandler()

itemRouter.get('/', itemHandler.listItem)
itemRouter.get('/:id', itemHandler.detailItem)
itemRouter.post('/', itemHandler.createItem)
itemRouter.put('/:id', itemHandler.updateItem)
itemRouter.delete('/:id', itemHandler.deleteItem)

export default itemRouter
