import { Component, OnInit } from '@angular/core';
import { Player } from '../../entity/Player';
import { PlayerService } from '../../services/playerService';
import { PlayerMusiquePlaceService } from '../../services/playerMusiquePlaceService';
import { PlayerMusiquePlace } from '../../entity/PlayerMusiquePlace';
import { FactoryDAO } from '../../DAO/FactoryDAO';
import { TransportService } from '../../services/transportService';

@Component({
  selector: 'app-musique-place-componant',
  templateUrl: './musique-place-componant.component.html',
  styleUrls: ['./musique-place-componant.component.css']
})
export class MusiquePlaceComponant implements OnInit {

  players: Player[];
  player: Player;
  pmps: PlayerMusiquePlace[];

  musiqueId: string;

  constructor(private factoryDAO: FactoryDAO,
    private playerService: PlayerService,
    private pmpService: PlayerMusiquePlaceService,
    private transportService: TransportService) { }

  ngOnInit() {
    this.playerService.getPlayers().subscribe((ps: Player[]) => {
      this.players = ps;
      this.pmpService.getObservable().subscribe((pmpsS: PlayerMusiquePlace[]) => {
        this.pmps = pmpsS;
        if (ps != null && ps.length > 0) {
          this.changePlayerOverride(ps[0]);
        }
      });
    });
  }

  changePlayer(playerId: number) {
    let pTmp = new Player();
    pTmp.id = playerId;
    this.changePlayerOverride(pTmp);
  }

  private changePlayerOverride(player: Player) {
    this.pmpService.chargeMusiques(player);
  }

  partageAll() {
    let list = new Array<string>();
    for (let pmp of this.pmps) {
      let url = this.factoryDAO.getMusiqueDAO().getStream(pmp.musique.id);
      list.push(url);
    }
    this.transportService.setMessage(list.join('\n'));
  }

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  drop(ev) {
    ev.preventDefault();

    let dragger: string = ev.dataTransfer.getData("text");
    let parent: string = ev.target.id;

    let idd = dragger.substring(3);
    let idp = parent.substring(3);

    let pos = this.getPositionZikById(idp);
    let pos2 = this.getPositionZikById(idd);
    let tmp = this.pmps[pos2];
    this.pmps[pos2] = this.pmps[pos];
    this.pmps[pos] = tmp;
    this.pmpService.updateMusique(this.pmps);
  }

  private getPositionZikById(id: string) {
    let pos = 0;
    for (let pmp of this.pmps) {
      if (pmp.musique.id == id) {
        return pos;
      }
      ++pos;
    }
    return null;
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

}
