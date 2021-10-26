import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Games } from '../models/games';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  season = 2022;
  apikey = "051c4d1ebbec4a7288e20ebfe6c715d7";

  constructor(
    private http: HttpClient
  ) {}

  getCurrentSeason() {
    const apiurl = `https://api.sportsdata.io/v3/nba/scores/json/CurrentSeason?key=${this.apikey}`;
    return this.http.get(apiurl)[0];
  }

  getScore(): Observable<Games[]> {
    const apiGames = "Games/";
    const apiurl = `https://api.sportsdata.io/v3/nba/scores/json/${apiGames}${this.season}?key=${this.apikey}`;
    return this.http.get<Games[]>(apiurl).pipe(
      map(games => games.sort((a: Games, b: Games) => new Date(b.DateTime).getTime() - new Date(a.DateTime).getTime()))
    );
  }

}
