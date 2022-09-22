import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
@Component({
  selector: 'app-modal-ask-name',
  templateUrl: './modal-ask-name.component.html',
  styleUrls: ['./modal-ask-name.component.scss']
})
export class ModalAskNameComponent implements AfterViewInit { 
  @Output()
  sendPlayerName = new EventEmitter<string>();

  @ViewChild("focusInput")
  focusInput : ElementRef;

  playerName: string;

  constructor() { 
    
  }

  ngAfterViewInit(): void {
    this.focusInput.nativeElement.placeholder = "";
    this.focusInput.nativeElement.focus();
  }

  sendName(value: string): void {
    this.sendPlayerName.emit(value)
  }
}
