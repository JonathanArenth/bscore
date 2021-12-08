import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { StatsPlayerTeams } from '../../../share/models/statsPlayersTeams';
import { Teams } from '../../../share/models/teams';
import { DialogTeamComponent } from './dialog-team/dialog-team.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})

export class TeamsComponent implements OnInit {

  @Input() listTeams: Teams[];
  @Input() currentSeason: number;
  @Input() players: StatsPlayerTeams[];

  actualSeason: string;
  breakpoint: number;
  teamSelected : string;
  teamSelectedCity: string;
  teamSelectedName: string;
  teamSelectedLogo: string;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.actualSeason = (this.currentSeason -1) + '-' + this.currentSeason;
    // responsive of mat-grid
    if (window.innerWidth <= 400) {
      this.breakpoint = (window.innerWidth <= 400) ? 2 : 6;
    }
    else {
      this.breakpoint = (window.innerWidth <= 800) ? 4 : 6;
    }
  }

  onResize(event) {
    if (event.target.innerWidth <= 400){
      this.breakpoint = (event.target.innerWidth <= 400) ? 2 : 6;
    }
    else{
      this.breakpoint = (event.target.innerWidth <= 800) ? 4 : 6;
    }
 }

 checkTeam(idTeam, city, name, logo): void {
   this.teamSelected = idTeam;
   this.teamSelectedCity = city;
   this.teamSelectedName = name;
   this.teamSelectedLogo = logo;
 }

 OpenDialog(): void{
   if(this.teamSelected !== undefined){
     this.dialog.open(DialogTeamComponent, {
       data: {
         teamSelected: this.teamSelected,
         teamSelectedCity: this.teamSelectedCity,
         teamSelectedName: this.teamSelectedName,
         teamSelectedLogo: this.teamSelectedLogo,
         players: this.players
        },
      });
   }
 }
}
