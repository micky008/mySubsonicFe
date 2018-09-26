import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { FactoryDAO } from '../../DAO/FactoryDAO';

import { switchMap } from 'rxjs/operators';
import { Folder } from '../../entity/Folder';
import { Musique } from '../../entity/Musique';
import { FolderService } from '../../services/folderService';
@Component({
  selector: 'app-musique-chooser-componant',
  templateUrl: './musique-chooser-componant.component.html',
  styleUrls: ['./musique-chooser-componant.component.css']
})
export class MusiqueChooserComponant implements OnInit {

  folders: Folder[];
  musiques: Musique[];
  parentFolder: Folder;
  haveFolders: boolean = false;  

  @ViewChild('singlePlayer')
  private playerRef: ElementRef;

  constructor(private route: ActivatedRoute, private factoryDAO: FactoryDAO, private folderService: FolderService) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      let folderId: string = routeParams.folderId;
      let folder: Folder = new Folder();
      folder.id = folderId;
      this.factoryDAO.getFolderDAO().getChildFolder(folder).then((fs: Folder[]) => {
        this.folders = fs;
        this.haveFolders = (fs != null && fs.length > 0);
      });
      this.factoryDAO.getMusiqueDAO().getMusiquesByFolder(folder.id).then((ms: Musique[]) => {
        this.musiques = ms;
      });

      this.folderService.getLastFolder().subscribe( (f : Folder) => {
        this.parentFolder = f;
      }); 
    });

  }

  chargeMusique(idMusique: string) {
    let url: string = this.factoryDAO.getMusiqueDAO().getStream(idMusique);
    let audioPlayer: HTMLAudioElement = this.playerRef.nativeElement;
    audioPlayer.setAttribute('src', url);
  }

  setLastFolder(folder: Folder) {
    this.folderService.setLastFolder(folder);
  }

}
