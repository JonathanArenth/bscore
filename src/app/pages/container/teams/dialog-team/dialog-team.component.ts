import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-team',
  templateUrl: './dialog-team.component.html',
  styleUrls: ['./dialog-team.component.scss']
})
export class DialogTeamComponent implements OnInit {

  titleTable = [
    {title: ''},
    {title: 'Joueur'},
    {title: 'Position'},
    {title: 'BirthDate'},
    {title: 'Taille'},
    {title: 'Poids'},
    {title: 'Ville de naissance'},
    {title: 'Université'},
    {title: 'Salaire $'},
    {title: 'Expérience'},
    {title: 'Temps de jeux'},
    {title: 'Points'},
    {title: '% 2 points'},
    {title: '% 3 points'},
    {title: 'Rebonds Offencif'},
    {title: 'Rebonds défensif'},
    {title: 'Shots Bloqué'},
  ]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('data ', data.teamSelected);

  }

  ngOnInit(): void {
  }

}
