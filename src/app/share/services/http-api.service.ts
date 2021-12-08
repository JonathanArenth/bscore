import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, map, timeout } from 'rxjs/operators';

import { Games } from '../models/games';
import { News } from '../models/news';
import { Teams } from '../models/teams';
import { TeamsStats } from '../models/teamsStats';
import { MessageService } from './message.service';
import { Ranking } from '../models/ranking';
import { StatsPlayer } from '../models/statsPlayer';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  season: any;
  findSeason = 2022;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    //const apiurl = `https://api.sportsdata.io/v3/nba/scores/json/CurrentSeason?key=${environment.apikey}`;
    //this.http.get(apiurl).subscribe((currentSeason) => {
    //  this.season = currentSeason;
    //  this.findSeason = this.season.Season;
    //});
  }

  getTeams(): Observable<Teams[]> {
    const apiurl = `https://api.sportsdata.io/v3/nba/scores/json/teams?key=${environment.apikey}`;
    return this.http.get<Teams[]>(apiurl).pipe(
      tap(_ => this.log('fetched teams')),
      catchError(this.handleError<Teams[]>('getTeams, []'))
      );
  }

  getNews(): Observable<News[]> {
    const apiurl = `https://api.sportsdata.io/v3/nba/scores/json/News?key=${environment.apikey}`;
    return this.http.get<News[]>(apiurl).pipe(
      tap(_ => this.log('fetched news')),
      catchError(this.handleError<News[]>('getNews, []'))
    );
  }

  getTeamsStats(): Observable<TeamsStats[]> {
    const apiurl = `https://api.sportsdata.io/v3/nba/scores/json/Standings/${this.findSeason}?key=${environment.apikey}`;
    return this.http.get<TeamsStats[]>(apiurl).pipe(
      tap(_ => this.log('fetched teamsStats')),
      catchError(this.handleError<TeamsStats[]>('getTeamsStats, []'))
      );
  }

  getGames(): Observable<Games[]> {
    const apiGames = "Games/";
    const apiurl = `https://api.sportsdata.io/v3/nba/scores/json/${apiGames}${this.findSeason}?key=${environment.apikey}`;
    return this.http.get<Games[]>(apiurl).pipe(
      map(games =>
        games.sort((a: Games, b: Games) => new Date(b.DateTime).getTime() - new Date(a.DateTime).getTime()),
        ),
        catchError(this.handleError<Games[]>('getGames, []'))
    );
  }

  getRank(): Observable<Ranking[]> {
    const apiurl = `https://api.sportsdata.io/v3/nba/scores/json/Standings/${this.findSeason}?key=${environment.apikey}`;
    return this.http.get<Ranking[]>(apiurl).pipe(
      tap(_ => this.log('fetched ranking')),
      catchError(this.handleError<Ranking[]>('ranking, []'))
      );
  }

  getStatsPlayers(): Observable<StatsPlayer[]> {
    const apiurl = `https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/${this.findSeason}?key=${environment.apikey}`;
    return this.http.get<StatsPlayer[]>(apiurl).pipe(
      tap(_ => this.log('fetched statsPlayer')),
      catchError(this.handleError<StatsPlayer[]>('statsPlayer, []'))
      );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
   this.messageService.add(`HeroService: ${message}`);
  }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

