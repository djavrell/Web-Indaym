import { Component }    from '@angular/core';
import { Router }       from '@angular/router';

import { GameService }  from '../../services/game.service';

@Component({
  selector  : 'ia-store',
  templateUrl   : './store.component.html',
  styleUrls    : [
    './store.component.scss',
  ],
  providers : [ GameService ],
})
export class StoreComponent {
  public lsGames = [];

  constructor(private games: GameService, private router: Router) {
    this.getGamesList();
  }

  public getGamesList() {
    this.games.getGames((datas) => this.lsGames = datas);
  }

  public goToRateGame(id, isNew) {
    this.router.navigate(['/rategame'], { queryParams: { gameId: id, new: isNew } });
  }
}
