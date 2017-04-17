/**
 * Created by Caro on 02/03/2017.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GameService {
  private gamesUrl = 'http://localhost:3000/games';
  private games = [];

  constructor(private http: Http) { }

  getGames() {
    console.log("loading games");

    this.games = [];
    this.http.get(this.gamesUrl)
      .flatMap((res) => res.json())
      .subscribe(data => {this.games.push(data);});
    return this.games;
  }

  getOneGame(id, callback) {
    this.http.get(this.gamesUrl + '/' + id)
      .map((res) => res.json())
      .subscribe(callback);
  }

  postGame(name, meuh, callback) {
    console.log("posting game : " + name);

    this.http.post(this.gamesUrl, {"name": name})
      .map((res) => res.json())
      .subscribe(data => callback(meuh, data));
  }
}
