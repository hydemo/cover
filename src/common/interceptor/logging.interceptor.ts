import { Injectable, NestInterceptor, ExecutionContext, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    Logger.log(`${request}`);

    const now = Date.now();
    return call$.pipe(
      tap(() => Logger.log(`Complete... ${Date.now() - now}ms`)),
    );
  }
}