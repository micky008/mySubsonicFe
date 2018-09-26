import { Injectable, OnInit } from "@angular/core";
import { Folder } from "../entity/Folder";
import {  of, Observable } from "rxjs";


@Injectable({
    providedIn: 'root',
})
export class FolderService  {


    private folderO: Observable<Folder>;

    private folder : Folder = new Folder();

    constructor() { 
        this.folderO = of(this.folder);
    }


    public getLastFolder(): Observable<Folder> {
        return this.folderO;
    }


    public setLastFolder(folder: Folder): void {        
        this.folder.id = folder.id;        
        this.folder.idParent = folder.idParent;        
        this.folder.imgAlbum = folder.imgAlbum;        
        this.folder.name = folder.name;        
    }


}