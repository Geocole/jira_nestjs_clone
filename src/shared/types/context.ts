import { ExecutionContext } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export interface GQLContext extends ExecutionContext {
  req: Request;
  res: Response;
  next: NextFunction;
}
