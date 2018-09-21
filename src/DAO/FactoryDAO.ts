import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FolderDAO } from "src/DAO/WS/FolderDAO";
import { MusiqueDAO } from "./WS/MusiqueDAO";
import { PlayerDAO } from "./WS/PlayerDAO";

@Injectable({
    providedIn: 'root',
})
export class FactoryDAO {

    constructor(private http: HttpClient) { }

    private fdao: FolderDAO = null;
    private mdao: MusiqueDAO = null;
    private pdao: PlayerDAO = null;


    public getFolderDAO(): FolderDAO {
        if (this.fdao == null) {
            this.fdao = new FolderDAO(this.http);
        }
        return this.fdao;
    }
    public getMusiqueDAO(): MusiqueDAO {
        if (this.mdao == null) {
            this.mdao = new MusiqueDAO(this.http);
        }
        return this.mdao;
    }
    public getPlayerDAO(): PlayerDAO {
        if (this.pdao == null) {
            this.pdao = new PlayerDAO(this.http);
        }
        return this.pdao;
    }

}