import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/apiResponse'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserCodeService {
  public baseUrl: string = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
  };

  /** GET all codes redeemed by user */
  getUserCodes(user_id: string): Observable<any>{
    return this.http.get<ApiResponse>(`${this.baseUrl}/user/${user_id}/codes`);
  }

}
