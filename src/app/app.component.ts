import { Component } from '@angular/core';
import { FactoryDAO } from '../DAO/FactoryDAO';
import { Folder } from '../entity/Folder';
import { Player } from '../entity/Player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mySubsonicFe';

  constructor(public factoryDAO: FactoryDAO) { }

  toto() {
    let p: Player = new Player();
    p.nom = 'totopopo';
    this.factoryDAO.getPlayerDAO().insertPlayer(p).then((pl: Player) => {
      console.log(pl);
    })

  }

}
