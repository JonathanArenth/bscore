import { Component, Input, OnInit } from '@angular/core';

import { Games } from '../../../share/models/games';
import { Ranking } from '../../../share/models/ranking';
import { Teams } from '../../../share/models/teams';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{

  @Input() listGames: Games[];
  @Input() listTeams: Teams[];
  @Input() currentSeason: number;
  @Input() listNextGames: Games[];
  @Input() listRanksE: Ranking[];
  @Input() listRanksW: Ranking[];

  actualSeason: string;

  titleTable = [
    {title: 'Equipe'},
    {title: 'Victoires'},
    {title: 'Défaites'},
    {title: 'Victoires à domicile'},
    {title: 'Défaites à domicile'},
    {title: 'Victoires à l\'extérieur'},
    {title: 'Défaites à l\'extérieur'}
  ]

  constructor(
  ) { }

  ngOnInit(): void {
    this.actualSeason = (this.currentSeason -1) + '-' + this.currentSeason;
  }
}
