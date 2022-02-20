import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {delay, Observable} from 'rxjs';
import {Injectable} from '@angular/core';

export const HTTP_DELAY = 3000;

@Injectable()
export class HttpDelayInterceptor implements HttpInterceptor {
  /**
   * Intercept the request to set delay.
   * @param req Request.
   * @param next Next handler.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      // Set delay.
      .pipe(delay(HTTP_DELAY));
  }
}
