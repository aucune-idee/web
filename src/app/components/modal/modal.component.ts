import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  shown:boolean = false;

  constructor() { }

  ngOnInit() {
  }


  show():void{
    this.shown = true;
  }

  close():void{
    this.shown = false;
  }
}
