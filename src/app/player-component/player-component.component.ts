import { Component, OnInit } from '@angular/core';
import { Player } from '../../entity/Player';
import { FactoryDAO } from '../../DAO/FactoryDAO';

@Component({
  selector: 'app-player-component',
  templateUrl: './player-component.component.html',
  styleUrls: ['./player-component.component.css']
})
export class PlayerComponent implements OnInit {

  players: Player[];

  constructor(private factoryDAO: FactoryDAO) { }

  ngOnInit() {
    this.factoryDAO.getPlayerDAO().getAllPlayers().then((ps: Player[]) => {
      this.players = ps;
    }).catch(e => { alert(e); console.log(e) });
  }

  addPlayer(playerName: string) {
    if (this.players == null) {
      this.players = new Array<Player>();
    }
    let p: Player = new Player();
    p.nom = playerName;
    this.factoryDAO.getPlayerDAO().insertPlayer(p).then((pNew: Player) => {
      this.players.push(pNew);
    }).catch(e => { alert(e); console.log(e) });
  }

}
