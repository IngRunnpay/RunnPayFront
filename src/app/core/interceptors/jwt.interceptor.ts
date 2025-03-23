import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtService } from '../services/jwt.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  var clonedRequest: any = '';
  var tokenJwt: any = '';
  const jwtService = inject(JwtService);
  tokenJwt = jwtService.getTokenJwt();
  clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${tokenJwt}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': 'Origin',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'

    }
  });
  return next(clonedRequest);

};
