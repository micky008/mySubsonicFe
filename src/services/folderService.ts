import { Injectable, OnInit } from "@angular/core";
import { Folder } from "../entity/Folder";
import { of, Observable } from "rxjs";


@Injectable({
    providedIn: 'root',
})
export class FolderService {


    private folderO: Observable<Folder>;

    private folder: Folder = new Folder();

    private breadCrum: Folder[] = [];
    private breadO: Observable<Folder[]>;

    constructor() {
        this.folderO = of(this.folder);
        this.breadO = of(this.breadCrum);
    }


    public getLastFolder(): Observable<Folder> {
        return this.folderO;
    }

    public getBreadCrum(): Observable<Folder[]> {
        return this.breadO;
    }

    public addInBreadCrum(folder: Folder) {
        this.breadCrum.push(folder);
    }

    public resetBreadCrum(until?: Folder) {
        if (until == null) {
            let rootFolder: Folder = new Folder();
            rootFolder.id = '00000000-0000-0000-0000-000000000001';
            rootFolder.idParent = '00000000-0000-0000-0000-000000000001';
            rootFolder.name = 'root';
            while (this.breadCrum.pop() != null);
            this.breadCrum.push(rootFolder);
        } else {
            let i = this.breadCrum.length-1;
            while(this.breadCrum[i] != until){
                i--;
                this.breadCrum.pop();
            }
        }
        
    }




    public setActualFolder(folder: Folder): void {
        this.folder.id = folder.id;
        this.folder.idParent = folder.idParent;
        this.folder.imgAlbum = folder.imgAlbum;
        this.folder.name = folder.name;
    }


}