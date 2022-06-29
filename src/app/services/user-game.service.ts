import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/apiResponse'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGameService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
  };

  /** GET all codes */
  getUserGames(): Observable<any>{
    return this.http.get<ApiResponse>('http://localhost:8080/borderlands-code-crawler/v1/user/1/games');
  }

}
