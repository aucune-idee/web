import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { WebsocketService } from '@services';

import * as Zdog from 'zdog';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private gameWs: Subject<any>;

  constructor(private ws:WebsocketService) { }

  ngOnInit() {
    this.gameWs = <Subject<any>>this.ws.connect(environment.urls.game[0])
      .pipe(
        map((response:any) => response)
      );
    //this.socket.of("game_1")
    //this.socket.emit('createGame', {game:1});
    
    let isSpinning = true;
     
    let illo = new Zdog.Illustration({
      element: '.zdog-canvas',
      zoom: 4,
      dragRotate: true,
      // stop spinning when drag starts
      onDragStart: function() {
        isSpinning = false;
      },
    });
     
    // circle
    new Zdog.Ellipse({
      addTo: illo,
      diameter: 20,
      translate: { z: 3 },
      stroke: 5,
      color: '#636',
    });
     
    // square
    new Zdog.Rect({
      addTo: illo,
      width: 20,
      height: 20,
      translate: { z: -3 },
      stroke: 3,
      color: '#E62',
      fill: true,
    });
     
    function animate() {
      illo.rotate.y += isSpinning ? 0.03 : 0;
      illo.updateRenderGraph();
      requestAnimationFrame( animate );
    }
    animate();
  }

  send(){
    this.gameWs.next("1");
  }

}
