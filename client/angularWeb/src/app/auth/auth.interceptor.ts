import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


import { UserService } from './../shared/user.service';

@Injectable({providedIn: 'root'})

export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // return next.handle(req);

    if (req.headers.get('noauth')) {
      return next.handle(req.clone());
    } else {
      const clonedreq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.userService.getToken())
      });

      return next.handle(clonedreq).pipe(     // pipe use to handle errors
        tap(
          event => {},
          err => {
            if (err.error.auth === false) {
              this.router.navigateByUrl('/login');
            }
          }
        )
      );
    }
  }

}
