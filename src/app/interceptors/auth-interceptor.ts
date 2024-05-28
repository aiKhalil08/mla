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
        /^admin/, /^student/, /^user/, /^quiz/
    ]

    constructor(private xsrf: XSRFService, private jwt: JWTService, private refresh: RefreshTokenService, private auth: AuthService, @Inject('DOMAIN_NAME') private domain_name, private httpClient: HttpClient) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | null {
        // add credentials (cookies) and x-xsrf-token header to all requests
        let newReq = req.clone({withCredentials: true, setHeaders: {'X-XSRF-TOKEN': this.xsrf.get()}});
        let requestPath: string = null;

        let match = String(req.url).match(/.*\/api\/(.+)$/)
        
        requestPath = match ? match[1] : 'non-api';

        if (!this.protectedRoutes.some((pattern)=> pattern.test(requestPath))) return next.handle(newReq);
       
        // add authorization header to all requests to protected routes
        newReq = newReq.clone({setHeaders: {'Authorization': `Bearer ${this.jwt.get()}`}});
        
        return next.handle(newReq);
    }
}
