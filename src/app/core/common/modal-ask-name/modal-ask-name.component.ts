import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-ask-name',
  templateUrl: './modal-ask-name.component.html',
  styleUrls: ['./modal-ask-name.component.scss']
})
export class ModalAskNameComponent implements OnInit { 
  @Output()
  sendPlayerName = new EventEmitter<string>()

  playerName: string;

  constructor() { }

  ngOnInit(): void {
  }

  sendName(value: string) {
    console.log(value)
    this.sendPlayerName.emit(value)
  }
}
