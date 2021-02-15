import { Request } from 'express';
import { SignOptions } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import { InvalidTokenError } from '../errors/custom.error';
import * as dotenv from 'dotenv';
dotenv.config();

type anyObject = { [key: string]: any };

const SECRET_KEY: string = process.env.JWT_SECRET;

const isPlainObject = (value: any): boolean =>
  Object.prototype.toString.call(value) === '[object Object]';

export const getTokenFromRequest = (req: Request): string | null => {
  const header = req.get('Authorization');
  const [bearer, token] = header ? header.split(' ') : [null, null];
  return bearer === 'Bearer' && token ? token : null;
};

export const verifyToken = (token: string): anyObject => {
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    if (isPlainObject(payload)) {
      return payload as anyObject;
    }
    throw new Error();
  } catch (error) {
    throw new InvalidTokenError();
  }
};

export const signToken = (
  payload: Record<string, unknown>,
  options?: SignOptions,
): string => {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: '30 days',
    ...options,
  });
};
