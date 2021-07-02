import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AdminauthorizationService implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //get token from local storage
    let token = localStorage.getItem('admintoken');
    console.log(token);
    //if token is existed
    if (token) {
      //add it to header of req object
      if (
        req.url !== 'https://api.covid19india.org/data.json' &&
        req.url !== 'https://api.covid19india.org/state_district_wise.json'
      ) {
        //request to that api also contains the header hence we should not include the header when we are making request to that external api
        console.log('Url is ', req.url);
        let copyReqObj = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token),
        });

        //pass req obj to Server
        return next.handle(copyReqObj);
      } else {
        return next.handle(req);
      }
    }
    //if it is not existed
    else {
      return next.handle(req);
    }
  }
}
