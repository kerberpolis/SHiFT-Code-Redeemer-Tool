import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { GearboxData } from '../models/gearboxData';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl: string = environment.apiBaseUrl
  public static readonly TOKEN_STORAGE_KEY = 'token';
  public static readonly AUTH_STORAGE_KEY = 'auth';
  public userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) { 
      this.userSubject = new BehaviorSubject<User | null>(this.getUser());
      this.user = this.userSubject.asObservable();
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
  };

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.getToken()) {
      return true;
    }
    // navigate to login page
    this.router.navigate(['/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

  getUser() {
    const localAuth = localStorage.getItem(AuthService.AUTH_STORAGE_KEY);
    if(localAuth != null){
      return this.user = JSON.parse(localAuth);
    }
    return null;
  }

  getToken() {
    return localStorage.getItem(AuthService.TOKEN_STORAGE_KEY);
  }

  /** GET token */
  setToken(user: User): Observable<unknown> {
    const data = new HttpParams()
        .set('username', user.email)
        .set('password', user.password)
        .set('grant_type', 'password');

    return this.http.post(`${this.baseUrl}/token`, data, this.httpOptions);
  }

  /** GET user and then set as value in authService */
  setCurrentUser(): Observable<unknown> {
    const token = JSON.parse(localStorage.getItem(AuthService.TOKEN_STORAGE_KEY) || '{}');
    const request_options = {
      headers: {
          "Authorization": "Bearer " +  token.access_token,
      },
    };
  
    return this.http.get<User>(`${this.baseUrl}/user`, request_options);
  }

  register(userData: User): Observable<unknown> {
    return this.http.post('http://localhost:8080/borderlands-code-crawler/v1/register', userData, this.httpOptions);
  }

  verifyGearbox(gearboxData: GearboxData): Observable<unknown> {
    return this.http.post('http://localhost:8080/borderlands-code-crawler/v1/verify_gearbox', gearboxData, this.httpOptions);
  }

  logout(): void {
    localStorage.removeItem(AuthService.TOKEN_STORAGE_KEY);
    localStorage.removeItem(AuthService.AUTH_STORAGE_KEY);
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }
}
