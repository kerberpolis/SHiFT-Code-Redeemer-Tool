import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/apiResponse'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  public baseUrl: string = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
  };

  /** GET all codes */
  getCodes(): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.baseUrl}/codes`, this.httpOptions);
  }
}
