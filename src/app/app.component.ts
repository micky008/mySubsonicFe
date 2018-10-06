import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FactoryDAO } from '../DAO/FactoryDAO';
import { Folder } from '../entity/Folder';
import { Player } from '../entity/Player';
import { FolderService } from '../services/folderService';
import { MusiqueChooserComponant } from './musique-chooser-componant/musique-chooser-componant.component';
import { PlayerService } from '../services/playerService';
import { User } from '../entity/User';
import { TransportService, MyText } from '../services/transportService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  
  text : MyText;
  lastFolder: Folder = null;
  private loginB: boolean = true;
  private errorLogin: boolean = false;

  constructor(private folderService: FolderService, 
    private playerService: PlayerService, 
    private factoryDAO: FactoryDAO,
    private transportService : TransportService) { }

  ngOnInit() {
    this.folderService.getLastFolder().subscribe((f: Folder) => { this.lastFolder = f; });
    this.playerService.initPlayers();
    this.transportService.getMessageObservable().subscribe(  (txt : MyText) => {
      this.text = txt;
    });
  }

  componentRemoved(event: any) {
    if (event instanceof MusiqueChooserComponant) {
      this.lastFolder.imgAlbum = null;
    }
    this.text.text = "";
  }

  loginConnection(lg: string, pwd: string) {
    let u: User = new User();
    u.login = lg;
    u.password = pwd;
    this.factoryDAO.getUserDAO().loginUser(u).then(
      (b: boolean) => {
        this.errorLogin = !b;
        this.loginB = b;
      }
    ).catch(e => {
      alert(e);
      console.log(e);
    })
  }

}
