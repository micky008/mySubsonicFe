import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FactoryDAO } from '../DAO/FactoryDAO';
import { Folder } from '../entity/Folder';
import { Player } from '../entity/Player';
import { FolderService } from '../services/folderService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'mySubsonicFe';
  lastFolder: Folder = null;

  constructor(private folderService: FolderService) { }

  ngOnInit() {
    this.folderService.getLastFolder().subscribe((f: Folder) => { this.lastFolder = f; });
  }



}
