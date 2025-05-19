import { NextFunction, Request, Response } from 'express'
import path from 'node:path'

export interface AppError extends Error {
  status?: number
}

export interface Responses {
  status?: number
  message?: string
  data?: any
  total?: number
  per_page?: number
  current_page?: number
  last_page?: number
  errors?: ErrorResponse[]
  error?: string
}

export interface ErrorResponse {
  field?: string
  message?: string
}

export const Api = () => {
  const responseMessage = (req: Request, res: Response) => {
    if (!res.statusMessage) {
      res.statusMessage = 'OK'
    }
    
    res.status(res.statusCode).json({
      status: res.statusCode,
      message: res.statusMessage,
    } as Responses)
  }

  const responseData = (req: Request, res: Response, data: any) => {
    if (!res.statusMessage) {
      res.statusMessage = 'OK'
    }
    
    res.status(res.statusCode).json({
      status: res.statusCode,
      message: res.statusMessage,
      data: data,
    } as Responses)
  }

  const responseDataList = (
    req: Request,
    res: Response,
    data: any,
    total: number,
  ) => {
    let per_page = 0
    let current_page = 0
    let last_page = 0

    if (total !== 0) {
      per_page = 0
      current_page = 0
      last_page = 0
    } else {
      per_page = 0
      current_page = 0
      last_page = 0
    }

    if (!res.statusMessage) {
      res.statusMessage = 'OK'
    }
    
    res.status(res.statusCode).json({
      status: res.statusCode,
      message: res.statusMessage,
      total: total,
      per_page: per_page,
      current_page: current_page,
      last_page: last_page,
      data: data,
    } as Responses)
  }

  const responseFile = (req: Request, res: Response, data: any) => {
    res.sendFile(path.join(__dirname, `/../view/${data}`))
  }

  const responseError = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    res.status(err.status || 500).json({
      status: err.status || 500,
      message: err.message || 'Internal Server Error',
    } as Responses)
  }

  return {
    responseMessage,
    responseData,
    responseDataList,
    responseFile,
    responseError,
  }
}
