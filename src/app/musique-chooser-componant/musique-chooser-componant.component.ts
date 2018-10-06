import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { FactoryDAO } from '../../DAO/FactoryDAO';
import { Folder } from '../../entity/Folder';
import { Musique } from '../../entity/Musique';
import { FolderService } from '../../services/folderService';
import { Player } from '../../entity/Player';
import { PlayerService } from '../../services/playerService';
import { PlayerMusiquePlace } from '../../entity/PlayerMusiquePlace';
import { PlayerMusiquePlaceService } from '../../services/playerMusiquePlaceService';
import { TransportService } from '../../services/transportService';
@Component({
  selector: 'app-musique-chooser-componant',
  templateUrl: './musique-chooser-componant.component.html',
  styleUrls: ['./musique-chooser-componant.component.css']
})
export class MusiqueChooserComponant implements OnInit {

  folders: Folder[];
  musiques: Musique[];
  parentFolder: Folder;
  breadcrum: Folder[];
  players: Player[];
  playerId: number;

  musiqueId : string;

  @ViewChild('myTable')
  private myTable: ElementRef;

  constructor(private route: ActivatedRoute,
    private factoryDAO: FactoryDAO,
    private folderService: FolderService,
    private playerService: PlayerService,
    private pmpService: PlayerMusiquePlaceService,
    private transportService: TransportService) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      let folderId: string = routeParams.folderId;
      let folder: Folder = new Folder();
      folder.id = folderId;
      this.folderService.getLastFolder().subscribe((f: Folder) => {
        this.parentFolder = f;
      });
      this.folderService.getBreadCrum().subscribe((fs: Folder[]) => {
        this.breadcrum = fs;
      });
      this.factoryDAO.getFolderDAO().getChildFolder(folder).then((fs: Folder[]) => {
        this.folders = fs;
      });
      this.factoryDAO.getMusiqueDAO().getMusiquesByFolder(folder.id).then((ms: Musique[]) => {
        this.musiques = ms;
      });
      this.playerService.getPlayers().subscribe((ps: Player[]) => {
        this.players = ps;
        if (ps != null && ps.length > 0) {
          this.playerId = ps[0].id;
        }
      });
    });

  }

  setActualFolder(folder: Folder) {
    this.folderService.addInBreadCrum(folder);
    this.folderService.setActualFolder(folder);
  }

  setActualFolderBreadCrum(folder: Folder) {
    this.folderService.setActualFolder(folder);
    this.folderService.resetBreadCrum(folder);
  }


  private getSelectBox(): HTMLInputElement[] {
    let table: HTMLTableElement = this.myTable.nativeElement;
    let list: HTMLInputElement[] = null;
    list = new Array<HTMLInputElement>();
    let node: NodeListOf<Element> = table.getElementsByClassName('myChkBx');
    Array.from(node).forEach((c: Element) => {
      let chkTmp: HTMLInputElement = c as HTMLInputElement;
      if (chkTmp.checked) {
        list.push(chkTmp);
      }
    });
    return list;
  }

  partage(): void {
    let list: HTMLInputElement[] = this.getSelectBox();
    let res: string = "";
    list.forEach((chk: HTMLInputElement) => {
      let zikId: string = chk.id.split('_')[1];
      res += this.factoryDAO.getMusiqueDAO().getStream(zikId) + '\n';
    });
    this.transportService.setMessage(res);
  }

  add(): void {
    let list: HTMLInputElement[] = this.getSelectBox();
    this.addAll(list);
  }

  addAll(checkboxs?: HTMLInputElement[]): void {
    let table: HTMLTableElement = this.myTable.nativeElement;
    let list: HTMLInputElement[] = null;
    if (checkboxs != null) {
      list = checkboxs;
    } else {
      list = new Array<HTMLInputElement>();
      Array.from(table.getElementsByClassName('myChkBx')).forEach((chk: Element) => {
        let chkTmp: HTMLInputElement = chk as HTMLInputElement;
        chkTmp.checked = true;
        list.push(chkTmp);
      });
    }
    let pmps: PlayerMusiquePlace[] = new Array<PlayerMusiquePlace>();
    list.forEach((chk: HTMLInputElement, i: number) => {
      let pmp: PlayerMusiquePlace = new PlayerMusiquePlace();
      let idMusique: string = chk.id.split('_')[1];
      pmp.musique = new Musique();
      pmp.musique.id = idMusique;
      pmp.place = i;
      pmp.player = new Player();
      pmp.player.id = this.playerId;
      pmps.push(pmp);
    });
    this.pmpService.addMusique(pmps);

  }

}
