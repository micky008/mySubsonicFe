import { AbstractDAO } from "./abstract/AbstractDAO";
import { Musique } from "../../entity/Musique";
import { HttpClient } from "@angular/common/http";


export class MusiqueDAO extends AbstractDAO<Musique> {

    constructor(http: HttpClient) {
        super(http, "musiques");
    }

    public getMusiqueById(musiqueId : string): Promise<Musique> {
        let route = this.getFullRoute('id/' + musiqueId);
        return this.http.get<Musique>(route).toPromise();
    }

    public getMusiquesByFolder(folderId : string): Promise<Musique[]> {
        let route = this.getFullRoute('folder/' + folderId);
        return this.http.get<Musique[]>(route).toPromise();
    }

    public getMusiquesByPlayer(playerId : string): Promise<Musique[]> {
        let route = this.getFullRoute('player/' + playerId);
        return this.http.get<Musique[]>(route).toPromise();
    }

    /**
     * Retourne une url pour le lecteur audio
     * @param zikId l'UUID de la musique
     */
    public getStream(zikId : string): string {
        return this.getFullRoute('stream/' + zikId);         
    }

}
