import HttpException from '../common/exceptions';
import { Request, Response, NextFunction, request } from 'express';

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
  ) => {
    const status = error.statusCode || error.status || 500;
    response.status(status).send(error);
}
