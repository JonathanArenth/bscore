import { Component, OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { HttpApiService } from '../../../share/services/http-api.service';
import { Games } from '../../../share/models/games';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public games: Observable<Games[]>;

  constructor(
    private getApi: HttpApiService
  ) { }

  ngOnInit(): void {
    this.games = this.getApi.getScore();
  }
}
