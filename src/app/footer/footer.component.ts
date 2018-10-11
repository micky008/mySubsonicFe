import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PlayerService } from '../../services/playerService';
import { PlayerMusiquePlaceService } from '../../services/playerMusiquePlaceService';
import { Player } from '../../entity/Player';
import { Musique } from '../../entity/Musique';
import { PlayerMusiquePlace } from '../../entity/PlayerMusiquePlace';
import { FactoryDAO } from '../../DAO/FactoryDAO';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit,OnChanges {


  player: Player;
  musiqueId: string;
  players: Player[];
  pmps: PlayerMusiquePlace[];
  constructor(private factoryDAO: FactoryDAO, private playerService: PlayerService, private pmpService: PlayerMusiquePlaceService) { }

  ngOnInit() {
    if (this.playerService.getPlayers() == null) {
      this.playerService.initPlayers().then(() => {
        this.playerService.getPlayers().subscribe((ps: Player[]) => {
          this.players = ps;
        });
      });
    } else {
      this.playerService.getPlayers().subscribe((ps: Player[]) => {
        this.players = ps;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }


  selectPlayer(idPlayer: number) {
    this.factoryDAO.getPlayerDAO().getPmpByPlayer(idPlayer).then((pmpsT: PlayerMusiquePlace[]) => {
      this.pmps = pmpsT;
      if (pmpsT != null && pmpsT.length > 0) {
        this.selectMusique(pmpsT[0].musique.id)
      }
    }).catch(e => { alert(e); console.log(e) })
  }

  selectMusique(idZik: string) {
    this.musiqueId = idZik;
  }

}
