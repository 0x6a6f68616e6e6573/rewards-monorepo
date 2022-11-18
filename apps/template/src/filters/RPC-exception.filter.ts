import { Catch, ArgumentsHost, RpcExceptionFilter } from '@nestjs/common';
import { Observable, Subscriber } from 'rxjs';

@Catch(Error)
export class RpcErrorFilter implements RpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    // console.log(exception);
    return new Observable((subscriber) => {
      subscriber.next(null);
      subscriber.complete();
    });
  }
}
