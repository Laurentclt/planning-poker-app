import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-modal-invite-players',
  templateUrl: './modal-invite-players.component.html',
  styleUrls: ['./modal-invite-players.component.scss']
})
export class ModalInvitePlayersComponent implements OnInit {
  @Output()
  emitModal = new EventEmitter()
  
  urlGameSession:string = window.location.href ;
  isTextCopied: boolean = false;
  showModal: boolean; 

  constructor() {}

  ngOnInit(): void {
    this.showModal = true;
  }
  closeModal(e: Event): void {
    e.stopPropagation()
    this.showModal = false;
    this.emitModal.emit()
  }
  cancelAction(e: Event): void {
    e.stopPropagation()
  }
  copyUrl(): void {
    navigator.clipboard.writeText(this.urlGameSession)
    this.isTextCopied = true
  }

}
