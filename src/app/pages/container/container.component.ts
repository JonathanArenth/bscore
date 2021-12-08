import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Games } from '../../share/models/games';
import { News } from '../../share/models/news';
import { Players } from '../../share/models/players';
import { Ranking } from '../../share/models/ranking';
import { StatsPlayer } from '../../share/models/statsPlayer';
import { Teams } from '../../share/models/teams';
import { TeamsStats } from '../../share/models/teamsStats';
import { HttpApiService } from '../../share/services/http-api.service';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit{

  games: Games[];
  itemGames: Games[];
  itemNextGames: Games[];
  teamsRankE: Ranking[];
  teamsRankW: Ranking[];
  news$: Observable<News[]>;
  teams: Teams[];
  newPlayersStats = [];
  teamsStats: TeamsStats[];
  statsPlayer: StatsPlayer[];
  playerInTeams = [];
  statsPlayersInTeams = [];
  players: Players[];
  merged: any;
  teamsWithStats: [{}] = [{}];
  gamesWithTeams: [{}] = [{}];
  routeName: any;
  season: number;
  keyTeams: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private getApi: HttpApiService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.routeName = params['name'];
    });
    this.news$ = this.getApi.getNews();
    this.getApi.getTeams().subscribe((allTeams) => {
      this.teams = allTeams;
      for (let i of allTeams){
        this.keyTeams = i.Key;
        const apiurl = `https://api.sportsdata.io/v3/nba/stats/json/Players/${this.keyTeams}?key=${environment.apikey}`
        this.http.get<Players[]>(apiurl).subscribe((allPlayers) => {
          this.players = allPlayers
            for (let j of this.players){
              if (i.Key === j.Team){
                this.playerInTeams.push({
                  'PlayerID': j.PlayerID,
                  'TeamID': j.TeamID,
                  'Team':i.Key,
                  'FirstName':j.FirstName,
                  'LastName': j.LastName,
                  'Position': j.Position,
                  'BirthDate': j.BirthDate,
                  'Height': j.Height,
                  'Weight': j.Weight,
                  'BirthCity': j.BirthCity,
                  'BirthCountry': j.BirthCountry,
                  'College': j.College,
                  'Salary': j.Salary,
                  'Experience': j.Experience,
                  'StatsPlayerID': j.StatsPlayerID,
                  'NbaDotComPlayerID': j.NbaDotComPlayerID,
                });
              }
            }
          });
        }
      this.getApi.getTeamsStats().subscribe((statsTeams) => {
        this.teamsStats = statsTeams;
        for (let i of this.teams) {
          for (let y of this.teamsStats){
            if (i.Key === y.Key) {
              this.teamsWithStats.push([i.Key, i.City, i.Name, i.WikipediaLogoUrl, y.Losses, y.Wins]);
            }
          }
        }
      });
    });
    this.getApi.getStatsPlayers().subscribe((statsPlayers) =>{
      this.statsPlayer = statsPlayers;
      for (let i of this.statsPlayer){
        for (let j of this.playerInTeams) {
          if (i.PlayerID === j.PlayerID){
            this.newPlayersStats.push({
              'PlayerID': j.PlayerID,
              'TeamID': j.TeamID,
              'FirstName':j.FirstName,
              'LastName': j.LastName,
              'Position': j.Position,
              'BirthDate': j.BirthDate,
              'Height': j.Height,
              'Weight': j.Weight,
              'BirthCity': j.BirthCity,
              'BirthCountry': j.BirthCountry,
              'College': j.College,
              'Salary': j.Salary,
              'Experience': j.Experience,
              'StatsPlayerID': j.StatsPlayerID,
              'NbaDotComPlayerID': j.NbaDotComPlayerID,
              'Team': i.Team,
              'Minutes': i.Minutes,
              'Seconds': i.Seconds,
              'Points': i.Points,
              'TwoPointersMade': i.TwoPointersMade,
              'TwoPointersAttempted': i.TwoPointersAttempted,
              'TwoPointersPercentage': i.TwoPointersPercentage,
              'ThreePointersMade': i.ThreePointersMade,
              'ThreePointersAttempted': i.ThreePointersAttempted,
              'ThreePointersPercentage': i.ThreePointersPercentage,
              'FreeThrowsMade': i.FreeThrowsMade,
              'FreeThrowsAttempted': i.FreeThrowsAttempted,
              'FreeThrowsPercentage': i.FreeThrowsPercentage,
              'OffensiveRebounds': i.OffensiveRebounds,
              'DefensiveRebounds': i.DefensiveRebounds,
              'Rebounds': i.Rebounds,
              'OffensiveReboundsPercentage': i.OffensiveReboundsPercentage,
              'DefensiveReboundsPercentage': i.DefensiveReboundsPercentage,
              'TotalReboundsPercentage': i.TotalReboundsPercentage,
              'Assists': i.Assists,
              'Steals': i.Steals,
              'BlockedShots': i.BlockedShots,
              'Turnovers': i.Turnovers,
              'PersonalFouls': i.PersonalFouls,
              'TrueShootingAttempts': i.TrueShootingAttempts,
              'TrueShootingPercentage': i.TrueShootingPercentage,
              'PlayerEfficiencyRating': i.PlayerEfficiencyRating,
              'AssistsPercentage': i.AssistsPercentage,
              'StealsPercentage': i.StealsPercentage,
              'BlocksPercentage': i.BlocksPercentage,
            })
          }
        }
      }
    });

    this.getApi.getGames().subscribe((allGames) => {
      this.games = allGames;
      // filtre les matchs ayant des scores
      const filterScore = this.games.filter(score => score.AwayTeamScore !== null);
      const filterNextGame = this.games.filter(
        nextgame => nextgame.AwayTeamScore === null && nextgame.DateTime !== null
        );
      // récuère uniquement les 10 derniers matchs
      this.itemGames = filterScore.slice(0, 9);
      // récupère le prochain match
      this.itemNextGames = filterNextGame.reverse().slice(0, 1);
    });

    this.getApi.getRank().subscribe((teamRank) => {
      this.teamsRankE = teamRank.filter(conf => conf.Conference === "Eastern").slice(0, 7);
      this.teamsRankW = teamRank.filter(conf => conf.Conference === "Western").slice(0, 7);
    });

    this.season = this.getApi.findSeason;
  }
}
