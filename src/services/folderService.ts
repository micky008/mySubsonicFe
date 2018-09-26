import { Injectable } from "@angular/core";
import { Folder } from "../entity/Folder";

@Injectable({
    providedIn: 'root',
})
export class FolderService {

    private folder: Folder;

    constructor() { }

    public getLastFolder(): Folder {
        return this.folder;
    }

    public setLastFolder(folder: Folder): void {
        this.folder = folder;
    }


}