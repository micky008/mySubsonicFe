import { Injectable, OnInit } from "@angular/core";
import { FactoryDAO } from "../DAO/FactoryDAO";
import { PlayerMusiquePlace } from "../entity/PlayerMusiquePlace";
import { Observable, of } from "rxjs";
import { Player } from "../entity/Player";

@Injectable({
    providedIn: 'root',
})
export class PlayerMusiquePlaceService implements OnInit {

    constructor(private factoryDAO: FactoryDAO) { }

    private playerMusiquePlaces: PlayerMusiquePlace[];
    private playerMusiquePlacesO: Observable<PlayerMusiquePlace[]>;

    ngOnInit(): void {
        this.playerMusiquePlaces = new Array<PlayerMusiquePlace>();
        this.playerMusiquePlacesO = of(this.playerMusiquePlaces);
    }

    public getObservable(): Observable<PlayerMusiquePlace[]> {
        return this.playerMusiquePlacesO;
    }

    private fillPmps(pmps: PlayerMusiquePlace[]): void {
        for (let pmp of this.playerMusiquePlaces) {
            this.playerMusiquePlaces.pop();
        }
        this.playerMusiquePlaces.concat(pmps);
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
     * a appeler apres un drag'n drop de musique danas la playlise.
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
                    this.playerMusiquePlaces.splice(no);
                }
                let place: number = 1;
                for (let pmp of this.playerMusiquePlaces) {
                    pmp.place = place++;
                }
            }
        ).catch(e => { alert(e); console.log(e); });
    }

    public addMusique(playerMusiquePlaces: PlayerMusiquePlace[]): void {
        if (playerMusiquePlaces == null || playerMusiquePlaces.length == 0) {
            return;
        }
        let idDebut: number = 1;
        let lastPmp: PlayerMusiquePlace = null;
        if (this.playerMusiquePlaces.length > 0) {
            lastPmp = this.playerMusiquePlaces[this.playerMusiquePlaces.length - 1];
            idDebut = lastPmp.place;
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