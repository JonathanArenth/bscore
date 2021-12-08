import { Component, Input, OnInit } from '@angular/core';
import { News } from '../../../share/models/news';
import { Teams } from '../../../share/models/teams';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  @Input() listNews: News[];
  @Input() listTeams: Teams[];

  constructor() { }

  ngOnInit(): void {
  }

}
