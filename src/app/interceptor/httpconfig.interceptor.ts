import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor( public router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                  //  console.log('event--->>>', event);
                  //  this.errorDialogService.openDialog(event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => { 
                //Send log to API
                if(error.status==401 && error.statusText=='Unauthorized'){
                    Swal.fire({ icon: 'warning', text:'User Session timeOut', confirmButtonText: 'Okay' }).then(()=>{
                        localStorage.clear();
                        this.router.navigateByUrl('/signin');
                        //window.location.reload();
                      });  
                } 
                // else if(error.status==0 && error.statusText=='Unknown Error'){
                //    // Swal.fire({ icon: 'warning', text:'Unknown Error,we are found double click or may be internet connection break, please check transactions details for further action.', confirmButtonText: 'Okay' }).then(()=>{
                //         //localStorage.clear();
                //         //this.router.navigateByUrl('/signin');
                //        // window.location.reload();
                //        // this.router.navigateByUrl('/retailer/error');
                //      //});  
                // }
                // else if(error.status==401 && error.statusText=='Ok'){
                //     Swal.fire({ icon: 'warning', text:'Session time Out,Please login again.', confirmButtonText: 'Okay' }).then(()=>{
                //         localStorage.clear();
                //         this.router.navigateByUrl('/signin');
                //         window.location.reload();
                //       });  
                // }
                else
                {
                    if(error.error.status==401 && error.error.statusText=='Unauthorized'){
                        Swal.fire({ icon: 'warning', text:'User Session timeOut', confirmButtonText: 'Okay' }).then(()=>{
                            localStorage.clear();
                            this.router.navigateByUrl('/signin');
                            //window.location.reload();
                          });  
                    } 
                }     
                return throwError("err");
            }));
    }
}
