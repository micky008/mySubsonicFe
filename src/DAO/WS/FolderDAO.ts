import { AbstractDAO } from "./abstract/AbstractDAO";
import { Folder } from '../../entity/Folder';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class FolderDAO extends AbstractDAO<Folder>{

    constructor(http: HttpClient) {
        super(http, "folders");
    }

    public getChildFolder(parentFolder: Folder): Promise<Folder[]> {
        let route = this.getFullRoute('parent/' + parentFolder.id);
        return this.http.get<Folder[]>(route).toPromise();
    }

    public getRootFolder(): Promise<Folder[]> {
        let route = this.getFullRoute('root');
        return this.http.get<Folder[]>(route).toPromise();
    }

    public launchScanInit() : Promise<boolean> {
        let route = this.getFullRoute('scan/initial');
        return this.http.get<boolean>(route).toPromise();
    }

    public launchScanInc() : Promise<boolean> {
        let route = this.getFullRoute('scan/inc');
        return this.http.get<boolean>(route).toPromise();
    }
}