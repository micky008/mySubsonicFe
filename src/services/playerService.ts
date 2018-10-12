import { Injectable, OnInit } from "@angular/core";
import { Player } from "../entity/Player";
import { Observable, of } from "rxjs";
import { FactoryDAO } from "../DAO/FactoryDAO";
import { PlayerMusiquePlace } from "../entity/PlayerMusiquePlace";
import { PlayerMusiquePlaceService } from "./playerMusiquePlaceService";

@Injectable({
    providedIn: 'root',
})
export class PlayerService {

    private players: Player[] = [];
    private playersO: Observable<Player[]>;

    private isInit = false;

    constructor(private factoryDAO: FactoryDAO, private pmpService: PlayerMusiquePlaceService) {
        this.initPlayers();
    }

    public initPlayers(): Promise<void> {
        return Promise.resolve(
            this.factoryDAO.getPlayerDAO().getAllPlayers().then((ps: Player[]) => {
                this.players = ps;
                this.playersO = of(this.players);
                if (ps != null && ps.length > 0) {
                    this.pmpService.chargeMusiques(ps[0]);
                }
                this.isInit = true;
            })
        );
    }

    public getPlayers(): Observable<Player[]> {
        if(!this.isInit){
            this.initPlayers().then(
                () => { 
                    this.isInit = true;
                    return this.playersO; 
                }
            );
        }
        return this.playersO;
    }

    public insertPlayer(p: Player): void {
        this.factoryDAO.getPlayerDAO().insertPlayer(p).then((pr: Player) => {
            this.players.push(pr);
        }).catch(e => { alert(e); console.log(e); });
    }

    public deletePlayer(p: Player): void {
        this.factoryDAO.getPlayerDAO().deletePlayer(p).then(() => {
            let i = 0;
            for (let pt of this.players) {
                if (pt.id == p.id) {
                    break;
                }
                i++;
            }
            this.players.splice(i, 1);
            this.pmpService.cleanPmps();
        }).catch(e => { alert(e); console.log(e); });
    }

    public updatePlayer(p: Player): void {
        this.factoryDAO.getPlayerDAO().updatePlayer(p).then(() => {
            let i = 0;
            for (let pt of this.players) {
                if (pt.id == p.id) {
                    break;
                }
                i++;
            };
            this.players[i] = p;
        }).catch(e => { alert(e); console.log(e); });
    }

}