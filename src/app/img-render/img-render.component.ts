import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-img-render',
  templateUrl: './img-render.component.html',
  styleUrls: ['./img-render.component.css']
})
export class ImgRenderComponent implements OnInit {

  @Input() img: string;
  @Input() width : number = 100;
  @Input() height : number = 100;

  constructor() { }

  ngOnInit() {
  }

}
