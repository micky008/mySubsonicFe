import { Injectable, OnInit } from "@angular/core";
import { Player } from "../entity/Player";
import { Observable, of } from "rxjs";
import { FactoryDAO } from "../DAO/FactoryDAO";

@Injectable({
    providedIn: 'root',
})
export class PlayerService implements OnInit {

    private players: Player[] = [];
    private playersO: Observable<Player[]>;

    constructor(private factoryDAO: FactoryDAO) {}

    ngOnInit(): void {
        this.initPlayers();
    }

    public initPlayers(): void {
        this.factoryDAO.getPlayerDAO().getAllPlayers().then((ps: Player[]) => {
            this.players = ps;
            this.playersO = of(this.players);
        });
    }

    public getPlayers(): Observable<Player[]> {
        return this.playersO;
    }

    public insertPlayer(p: Player): void {
        this.factoryDAO.getPlayerDAO().insertPlayer(p).then((pr: Player) => {
            this.players.push(pr);
        });
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
            this.players.splice(i);
        });
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
        });
    }

}