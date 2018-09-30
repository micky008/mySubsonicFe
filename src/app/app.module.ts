import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FactoryDAO } from '../DAO/FactoryDAO';
import { HttpClientModule } from '@angular/common/http';
import { PlayerComponent } from './player-component/player-component.component';
import { MusiqueChooserComponant } from './musique-chooser-componant/musique-chooser-componant.component';
import { MusiquePlaceComponant } from './musique-place-componant/musique-place-componant.component';
import { RootFolderComponent } from './root-folder/root-folder.component';
import { LoginComponent } from './login/login.component';
import { HtmlSafe } from '../helpers/HtmlSafe';
import { FolderService } from '../services/folderService';
import { ImgRenderComponent } from './img-render/img-render.component';
import { SpecialComponent } from './special/special.component';
import { PlayerService } from '../services/playerService';


const appRoutes: Routes = [
  { path: 'player', component: PlayerComponent },
  { path: 'pmp', component: MusiquePlaceComponant },
  { path: 'musique/:folderId', component: MusiqueChooserComponant },
  { path: 'specials', component: SpecialComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    MusiqueChooserComponant,
    MusiquePlaceComponant,
    RootFolderComponent,
    LoginComponent,
    HtmlSafe,
    ImgRenderComponent,
    SpecialComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [FactoryDAO, FolderService,PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
