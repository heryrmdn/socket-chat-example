import { NextFunction, Request, Response } from 'express'
import { Api } from '../util/api.util'

const api = Api()

export const ItemHandler = () => {
  const listItem = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.statusMessage = null as any

      api.responseDataList(req, res, [], 0)
    } catch (err) {
      next(err)
    }
  }

  const detailItem = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.statusMessage = null as any

      api.responseData(req, res, null)
    } catch (err) {
      next(err)
    }
  }

  const createItem = (req: Request, res: Response, next: NextFunction) => {
    try {
      if (Array.from(Object.entries(req.body)).length === 0) {
        throw Error('Failed create item')
      }

      res.statusMessage = null as any

      api.responseData(req, res, null)
    } catch (err) {
      next(err)
    }
  }

  const updateItem = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.statusMessage = null as any

      api.responseData(req, res, null)
    } catch (err) {
      next(err)
    }
  }

  const deleteItem = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.statusMessage = null as any

      api.responseData(req, res, null)
    } catch (err) {
      next(err)
    }
  }

  return {
    listItem,
    detailItem,
    createItem,
    updateItem,
    deleteItem,
  }
}
