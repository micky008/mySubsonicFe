import { Injectable, OnInit } from "@angular/core";
import { FactoryDAO } from "../DAO/FactoryDAO";
import { PlayerMusiquePlace } from "../entity/PlayerMusiquePlace";
import { Observable, of } from "rxjs";
import { Player } from "../entity/Player";

@Injectable({
    providedIn: 'root',
})
export class PlayerMusiquePlaceService {


    private playerMusiquePlaces: PlayerMusiquePlace[];
    private playerMusiquePlacesO: Observable<PlayerMusiquePlace[]>;


    constructor(private factoryDAO: FactoryDAO) {
        this.playerMusiquePlaces = new Array<PlayerMusiquePlace>();
        this.playerMusiquePlacesO = of(this.playerMusiquePlaces);
    }

    public getObservable(): Observable<PlayerMusiquePlace[]> {
        return this.playerMusiquePlacesO;
    }

    private fillPmps(pmps: PlayerMusiquePlace[]): void {
        let res: number = this.playerMusiquePlaces.length;
        for (let i = 0; i < res; i++) {
            this.playerMusiquePlaces.pop();
        }
        if (pmps == null) {
            return;
        }
        for (let pmp of pmps) {
            this.playerMusiquePlaces.push(pmp);
        }
    }

    public chargeMusiques(player: Player): void {
        if (player == null || player.id <= 0) {
            return;
        }
        this.factoryDAO.getPlayerDAO().getPmpByPlayer(player.id).then((pmps: PlayerMusiquePlace[]) => {
            this.fillPmps(pmps);
        }).catch(e => { alert(e); console.log(e); });
    }

    /**
     * a appeler apres un drag'n drop de musique danas la playlist.
     * @param playerMusiquePlaces 
     */
    public updateMusique(playerMusiquePlaces: PlayerMusiquePlace[]): void {
        if (playerMusiquePlaces == null || playerMusiquePlaces.length == 0) {
            return;
        }
        let place = 1;
        for (let pmp of playerMusiquePlaces) {
            pmp.place = place++;
        }
        this.factoryDAO.getPlayerDAO().updatePmps(playerMusiquePlaces).then(
            (pmps: PlayerMusiquePlace[]) => {
                this.fillPmps(pmps);
            }
        ).catch(e => { alert(e); console.log(e); });
    }

    public deleteMusique(playerMusiquePlaces: PlayerMusiquePlace[]): void {
        if (playerMusiquePlaces == null || playerMusiquePlaces.length == 0) {
            return;
        }
        this.factoryDAO.getPlayerDAO().deletePmps(playerMusiquePlaces).then(
            (pmps: PlayerMusiquePlace[]) => {
                let no: number = 0;
                for (let pmp of playerMusiquePlaces) {
                    no = 0;
                    for (let pmpOk of this.playerMusiquePlaces) {
                        if (pmp.id == pmpOk.id) {
                            break;
                        }
                        no++;
                    }
                    this.playerMusiquePlaces.splice(no,1);
                }
                let place: number = 1;
                for (let pmp of this.playerMusiquePlaces) {
                    pmp.place = place++;
                }
            }
        ).catch(e => { alert(e); console.log(e); });
    }

    public deleteMusiqueByPlayer(player : Player) : Promise<PlayerMusiquePlace[]> {
       return this.factoryDAO.getPlayerDAO().deletePmpsByPlayer(player);
    }

    public addMusique(playerMusiquePlaces: PlayerMusiquePlace[]): void {
        if (playerMusiquePlaces == null || playerMusiquePlaces.length == 0) {
            return;
        }
        let idDebut: number = 1;

        if (this.playerMusiquePlaces.length > 0) {
            let lastPmp: PlayerMusiquePlace = null;
            lastPmp = this.playerMusiquePlaces[this.playerMusiquePlaces.length - 1];
            idDebut = lastPmp.place + 1;
        }

        for (let pmp of playerMusiquePlaces) {
            pmp.place = idDebut++;
        }
        this.factoryDAO.getPlayerDAO().insertPmps(playerMusiquePlaces).then(
            (pmps: PlayerMusiquePlace[]) => {
                this.playerMusiquePlaces.concat(pmps);
            }
        ).catch(e => { alert(e); console.log(e); });

    }
}