import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { UsersDbService } from 'src/services/users-db.service';

@Component({
  selector: 'app-poker-room',
  templateUrl: './poker-room.component.html',
  styleUrls: ['./poker-room.component.scss'],
})
export class PokerRoomComponent implements OnInit {

  playerName: string;
  closeModal: boolean;
  // players: Array<Player>;

  constructor( private usersDbService: UsersDbService) {}

  ngOnInit() {
    // this.usersDbService.players.subscribe(data => {
    //   this.players = data
    // })
    // do I have to set currentUser in LocalStorage so this modal will not show even if the user refresh ?
    this.usersDbService.currentPlayer === undefined? this.closeModal = false : this.closeModal = true
  }
  getPlayerName(playerName : string): void {
    this.playerName = playerName
    this.closeModal = true
    this.usersDbService.addUser(playerName)
  }
}
