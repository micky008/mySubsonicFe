import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { FactoryDAO } from '../../../DAO/FactoryDAO';


@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit, OnChanges {


  @Input() zikId: string;

  @ViewChild('singlePlayer')
  private playerRef: ElementRef;

  constructor(private factoryDAO: FactoryDAO) { }

  ngOnInit() {
    if (this.zikId == null) {
      return;
    }
    this.chargeMusique(this.zikId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    let mId = changes.zikId.currentValue as string;
    if (this.zikId == null) {
      return;
    }
    this.chargeMusique(mId);
  }


  chargeMusique(idMusique: string) {
    let url: string = this.factoryDAO.getMusiqueDAO().getStream(idMusique);
    let audioPlayer: HTMLAudioElement = this.playerRef.nativeElement;
    audioPlayer.setAttribute('src', url);
  }


}
