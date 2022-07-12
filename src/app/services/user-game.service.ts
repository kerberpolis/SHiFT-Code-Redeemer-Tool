import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/apiResponse'
import { Observable } from 'rxjs';
import { UserGame } from '../models/userGame';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserGameService {
  public baseUrl: string = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
  };

  /** GET all codes */
  getUserGames(userId: number): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.baseUrl}/user_games/${userId}`);
  }

  /** POST: add a user game to the database */
  addUserGame(userGame: UserGame): Observable<UserGame> {
    return this.http.post<UserGame>(`${this.baseUrl}/user_games`,
                                    userGame, this.httpOptions);
  }

  /** DELETE: remove a user game from the database */
  deleteUserGame(userGameId: number): Observable<unknown> {
    return this.http.delete(`${this.baseUrl}/user_games/${userGameId}`, this.httpOptions);
  }
}
