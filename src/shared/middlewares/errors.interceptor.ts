import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { error } from 'console';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseError } from 'shared/errors/custom.error';
import { pick } from 'shared/helpers';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        console.log(err);
        const isErrorSafeForClient = err instanceof BaseError;

        if (isErrorSafeForClient) {
          const {
            code,
            status,
            message,
            data,
          }: Partial<InstanceType<typeof BaseError>> = pick(error, [
            'message',
            'code',
            'status',
            'data',
          ]);
          throw new BaseError(message, code, status, data);
        }

        throw new BaseError(
          'Something went wrong, please contact our support.',
          'INTERNAL_ERROR',
          500,
          {},
        );
      }),
    );
  }
}
