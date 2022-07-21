import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/apiResponse'
import { Observable } from 'rxjs';
import { FeedbackData } from '../models/feedbackData';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  public baseUrl: string = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
  };

  /** POST user feedback */
  submitFeedback(data: FeedbackData): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(`${this.baseUrl}/feedback`, data, this.httpOptions);
  }
}
