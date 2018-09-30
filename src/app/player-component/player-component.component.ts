import { Component, OnInit } from '@angular/core';
import { Player } from '../../entity/Player';
import { FactoryDAO } from '../../DAO/FactoryDAO';
import { PlayerService } from '../../services/playerService';

@Component({
  selector: 'app-player-component',
  templateUrl: './player-component.component.html',
  styleUrls: ['./player-component.component.css']
})
export class PlayerComponent implements OnInit {

  players: Player[];
  isModif: boolean = false;
  selectPlayerTmp : string;
  textModifTmp : string;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.getPlayers().subscribe((ps: Player[]) => {
      this.players = ps;
    });
  }

  addPlayer(playerName: string) {
    if (this.players == null) {
      this.players = new Array<Player>();
    }
    let p: Player = new Player();
    p.nom = playerName;
    this.playerService.insertPlayer(p);
  }

  choose(md: string) {
    let p: Player = new Player();
    p.id = Number.parseInt(this.selectPlayerTmp);
    if (md == 'd') {
      this.playerService.deletePlayer(p);
    } else {
      p.nom = this.textModifTmp;
      this.playerService.updatePlayer(p);
    }
  }

}
