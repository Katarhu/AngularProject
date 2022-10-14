import {Inject, Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {AuthService} from "./auth.service";
import {ErrorService} from "./error.service";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    @Inject('BASE_API_URL') private API_URL: string,
    private authService: AuthService,
    private errorService: ErrorService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const apiReq = req.clone({
      url: `${this.API_URL}/${req.url}`,
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });

    return next.handle(apiReq)
      .pipe(
        tap({
          next: () => {},
          error: (err) => {
            if ( err instanceof HttpErrorResponse && err.status == 401) {
              return this.authService.logOut()
            }
            this.errorService.setError(err.error.message);
          },
        })
      );
  }
}
