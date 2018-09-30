import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FactoryDAO } from '../DAO/FactoryDAO';
import { Folder } from '../entity/Folder';
import { Player } from '../entity/Player';
import { FolderService } from '../services/folderService';
import { MusiqueChooserComponant } from './musique-chooser-componant/musique-chooser-componant.component';
import { PlayerService } from '../services/playerService';
import { User } from '../entity/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'mySubsonicFe';
  lastFolder: Folder = null;
  private loginB: boolean = false;
  private errorLogin: boolean = false;

  constructor(private folderService: FolderService, private playerService: PlayerService, private factoryDAO: FactoryDAO) { }

  ngOnInit() {
    this.folderService.getLastFolder().subscribe((f: Folder) => { this.lastFolder = f; });
    this.playerService.initPlayers();
  }

  componentRemoved(event: any) {
    if (event instanceof MusiqueChooserComponant) {
      this.lastFolder.imgAlbum = null;
    }
  }

  loginConnection(lg: string, pwd: string) {
    let u: User = new User();
    u.login = lg;
    u.password = pwd;
    this.factoryDAO.getUserDAO().loginUser(u).then(
      (b: boolean) => {
        debugger;
        this.errorLogin = !b;
        this.loginB = b;
      }
    ).catch(e => {
      alert(e);
      console.log(e);
    })
  }

}
