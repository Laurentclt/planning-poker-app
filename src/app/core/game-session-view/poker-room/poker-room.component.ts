import { Component, OnInit } from '@angular/core';
import { DocumentChange } from '@angular/fire/firestore';
import { Player } from 'src/app/models/player.model';
import { map } from 'rxjs/operators';
import { UsersDbService } from 'src/services/users-db.service';

@Component({
  selector: 'app-poker-room',
  templateUrl: './poker-room.component.html',
  styleUrls: ['./poker-room.component.scss'],
})
export class PokerRoomComponent implements OnInit {

  playerName: string;
  closeModal: boolean;
  players: Array<Player>;

  constructor( private usersDbService: UsersDbService) {}

  ngOnInit() {
     // this.usersDbService.players
    // .subscribe( data => console.log('data', data))
    this.usersDbService.gameSessionsCollection.doc(this.usersDbService.currentGameSessionId).collection('players')
    .valueChanges().subscribe(data => this.players = data)

    // do I have to set currentUser in LocalStorage so this modal will not show even if the user refresh ?
    this.usersDbService.currentUser === undefined? this.closeModal = false : this.closeModal = true
  }
  getPlayerName(playerName : string): void {
    this.playerName = playerName
    this.closeModal = true
    this.usersDbService.addUser(playerName)
  }
  // changeCardValue(player: DocumentChange) {
  // }
}
