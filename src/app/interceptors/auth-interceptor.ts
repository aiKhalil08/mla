import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { XSRFService } from "../services/xsrf.service";
import { JWTService } from "../services/jwt.service";
import { RefreshTokenService } from "../services/refresh-token.service";
import { Observable, map } from "rxjs";
import { AuthService } from "../services/auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private protectedRoutes = [
        /test-auth/, /^admin/, /student/
    ]

    constructor(private xsrf: XSRFService, private jwt: JWTService, private refresh: RefreshTokenService, private auth: AuthService, @Inject('DOMAIN_NAME') private domain_name, private httpClient: HttpClient) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | null {
        let newReq = req.clone({withCredentials: true, setHeaders: {'X-XSRF-TOKEN': this.xsrf.get()}});
        let requestPath: string = null;
        // if (
        //     /login/.test(req.url) ||
        //     // (/\/student$/.test(req.url) && req.method == 'POST') ||
        //     (/\/student\/confirm-email$/.test(req.url) && req.method == 'POST') ||
        //     (/\/student\/send-otp$/.test(req.url) && req.method == 'POST') ||
        //     (/\/send_password_reset_link\//.test(req.url)) ||
        //     (/\/validate_link/.test(req.url)) ||
        //     (/\/reset_password/.test(req.url))
        //     ) {
        //     newReq = newReq.clone({setHeaders: {'X-XSRF-TOKEN': this.xsrf.get()}})
        // } 

        let match = String(req.url).match(/.*\/api\/(.+)$/)
        
        requestPath = match ? match[1] : 'non-api';
        // let res: Observable<HttpEvent<any>>;        ;

        if (!this.protectedRoutes.some((pattern)=> pattern.test(requestPath))) return next.handle(newReq);
        // console.log('or here', req.method);return null;
        // console.log('in auth and got here')
        // newReq = newReq.clone({setHeaders: {'randon': 'somen'}})
        // if (['POST', 'DELETE', 'PUT',].includes(req.method)) {
        //     newReq = newReq.clone({setHeaders: {'X-XSRF-TOKEN': this.xsrf.get()}})
        // }

        newReq = newReq.clone({setHeaders: {'Authorization': `Bearer ${this.jwt.get()}`}});
        
        return next.handle(newReq);
    }
}
