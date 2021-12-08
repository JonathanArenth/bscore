import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Games } from '../models/games';

@Injectable({
  providedIn: 'root'
})
export class ListMatchService {

  //Contient la valeur actuelle de la liste des matchs
  private listGamesSource = new BehaviorSubject(null);
  //variable gérant le flux de donnée (sera utilisée dans le composant)
  currentList = this.listGamesSource.asObservable();

  constructor() { }

  //Fonction qui apelle next pour modifier la valeur de la liste
  changeList(list: Observable<Games[]>){
    this.listGamesSource.next(list);
  }
}
