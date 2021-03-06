import { Component, OnInit } from '@angular/core';
import { FactoryDAO } from '../../DAO/FactoryDAO';
import { Folder } from '../../entity/Folder';
import { FolderService } from '../../services/folderService';

@Component({
  selector: 'app-root-folder',
  templateUrl: './root-folder.component.html',
  styleUrls: ['./root-folder.component.css']
})
export class RootFolderComponent implements OnInit {

  folders : Folder[];

  constructor(private factoryDAO: FactoryDAO, public folderService: FolderService) { }

  ngOnInit() {
    this.folderService.resetBreadCrum();
    this.factoryDAO.getFolderDAO().getRootFolder().then(
      (fs : Folder[]) => {
        this.folders = fs;
      }
    ).catch(e => {
        alert(e);
        console.log(e);
      }
    );
  }

  public setActualFolder(folder : Folder){
    this.folderService.resetBreadCrum();
    this.folderService.addInBreadCrum(folder);
    this.folderService.setActualFolder(folder);
  }

}
