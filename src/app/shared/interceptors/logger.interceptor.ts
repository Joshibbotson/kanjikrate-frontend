import { HttpInterceptorFn } from '@angular/common/http';

/** could we add the request url */
export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  const startTime = Date.now();

  next(req).subscribe({
    next: (res) => {
      const elapsedTime = Date.now() - startTime;
      console.log(`Request for ${req.urlWithParams} took ${elapsedTime} ms.`);
    },
  });

  return next(req);
};
