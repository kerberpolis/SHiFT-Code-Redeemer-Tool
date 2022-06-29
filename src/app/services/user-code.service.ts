import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/apiResponse'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCodeService {
  baseUrl: string = 'http://localhost:8080/borderlands-code-crawler/v1'

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
  };

  /** GET all codes redeemed by user */
  getUserCodes(): Observable<any>{
    return this.http.get<ApiResponse>(`${this.baseUrl}/user/1/codes`);
  }

}
