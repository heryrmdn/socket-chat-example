import { NextFunction, Request, Response } from 'express'
import { Api } from '../util/api.util'

const api = Api()

export const ChatHandler = () => {
  const listChat = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.statusMessage = null as any

      api.responseDataList(req, res, [], 0)
    } catch (err) {
      next(err)
    }
  }

  const detailChat = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.statusMessage = null as any

      api.responseData(req, res, null)
    } catch (err) {
      next(err)
    }
  }

  const createChat = (req: Request, res: Response, next: NextFunction) => {
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

  const updateChat = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.statusMessage = null as any

      api.responseData(req, res, null)
    } catch (err) {
      next(err)
    }
  }

  const deleteChat = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.statusMessage = null as any

      api.responseData(req, res, null)
    } catch (err) {
      next(err)
    }
  }

  const connectChat = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.statusMessage = null as any

      api.responseFile(req, res, 'index.html')
    } catch (err) {
      next(err)
    }
  }

  return {
    listChat,
    detailChat,
    createChat,
    updateChat,
    deleteChat,
    connectChat
  }
}
