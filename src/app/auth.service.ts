import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private webService: WebRequestService, private router: Router) {}

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // auth tokens will be in the header of response
        this.setSession(
          res.body._id,
          res.headers.get('x-access-token'),
          res.headers.get('x-refresh-token')
        );
      })
    );
  }

  getAccessToken(){
    return localStorage.getItem('x-access-token')
  }
  
  setAccessToken(accessToken: string){
    return localStorage.setItem('x-access-token', accessToken)
  }

  getRefreshToken(){
    return localStorage.getItem('x-refresh-token')
  }

  setRefreshToken(refreshToken: string){
    return localStorage.setItem('x-refresh-token', refreshToken)
  }

  private setSession(userId: string, accessToken: any, refreshToken: any) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('access-token', accessToken);
    localStorage.setItem('refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
  }

  logout() {
    this.removeSession();
  }


}
