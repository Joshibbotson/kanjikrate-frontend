import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalAuthService } from './auth.service'; // Adjust the path as necessary

// make this work, we need to pass the backend our token.
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  console.log('authInterceptor');
  const authService = inject(LocalAuthService);
  const token = authService.getToken();
  console.log(token);

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Cloned Request Headers:', cloned.headers); // Log the Authorization header
    return next(cloned);
  } else {
    return next(req);
  }
};
