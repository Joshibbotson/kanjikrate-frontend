import {
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { of } from 'rxjs';

const cache = new Map<string, HttpEvent<unknown>>();

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET') {
    return next(req);
  }
  const cachedResponse = cache.get(req.urlWithParams);
  if (!cachedResponse) {
    next(req).subscribe({
      next: (res) => {
        cache.set(req.urlWithParams, res);
      },
    });
    return of(cache.get(req.urlWithParams));
  }
  return of(cache.get(req.urlWithParams));
};
