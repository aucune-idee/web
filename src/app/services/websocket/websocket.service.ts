import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private io;

  constructor() { }

  connect(url: String, room?: String): Subject<MessageEvent> {

    this.io = socketIo(url.toString());
    let observable = new Observable(observer => {
      this.io.on('connect', socket => {
        console.log("connect")
        socket.emit("test");
        if (room) {
          socket.join(room)
        }
      });
      this.io.on('roomCreated', (data) => {
        console.log("Received message from Websocket Server")
        observer.next(data);
      })
      return () => {
        this.io.disconnect();
      }
    });

    let observer = {
      next: (data: Object) => {
        this.io.emit('createGame', JSON.stringify(data));
      },
    };

    return Subject.create(observer, observable);
  }
}
