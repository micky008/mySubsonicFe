import { Player } from "../../entity/Player";
import { AbstractDAO } from "./abstract/AbstractDAO";
import { HttpClient } from "@angular/common/http";
import { PlayerMusiquePlace } from "../../entity/PlayerMusiquePlace";

export class PlayerDAO extends AbstractDAO<Player>{

    constructor(http: HttpClient) {
        super(http, "players");
    }

    //@Get("/rest/players/players")
    //@Get("/rest/players/pmp/{idPlayer}") //recup les pmp by player
    //@Post("/rest/players/player/insert")
    //@Post("/rest/players/player/delete")
    //@Post("/rest/players/player/update")
    //@Post("/rest/players/pmp/update")
    //@Post("/rest/players/pmp/insert")
    //@Post("/rest/players/pmp/delete") //delete des musique du player

    public getAllPlayers(): Promise<Player[]> {
        let route = this.getFullRoute('players');
        return this.http.get<Player[]>(route).toPromise();
    }
    public getPmpByPlayer(idPlayer: number): Promise<PlayerMusiquePlace[]> {
        let route = this.getFullRoute('pmp/' + idPlayer);
        return this.http.get<PlayerMusiquePlace[]>(route).toPromise();
    }
    public insertPlayer(player: Player): Promise<Player> {
        let route = this.getFullRoute('player/insert');
        return this.http.post<Player>(route, player).toPromise();
    }
    public deletePlayer(player: Player): Promise<Player> {
        let route = this.getFullRoute('player/delete');
        return this.http.post<Player>(route, player).toPromise();
    }
    public updatePlayer(player: Player): Promise<Player> {
        let route = this.getFullRoute('player/update');
        return this.http.post<Player>(route, player).toPromise();
    }
    public insertPmps(pmps: PlayerMusiquePlace[]): Promise<PlayerMusiquePlace[]> {
        let route = this.getFullRoute('pmp/insert');
        return this.http.post<PlayerMusiquePlace[]>(route, pmps).toPromise();
    }
    public updatePmps(pmps: PlayerMusiquePlace[]): Promise<PlayerMusiquePlace[]> {
        let route = this.getFullRoute('pmp/update');
        return this.http.post<PlayerMusiquePlace[]>(route, pmps).toPromise();
    }
    public deletePmps(pmps: PlayerMusiquePlace[]): Promise<PlayerMusiquePlace[]> {
        let route = this.getFullRoute('pmp/delete');
        return this.http.post<PlayerMusiquePlace[]>(route, pmps).toPromise();
    }



}