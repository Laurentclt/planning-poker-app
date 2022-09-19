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
  closeModal: boolean = false;
  players: Array<Player>;

  constructor( private usersDbService: UsersDbService) {}

  ngOnInit() {
    this.usersDbService.playersCollection.valueChanges()
    .subscribe( data => this.players = data)
  }

  getPlayerName(playerName : string) {
    this.playerName = playerName
    this.closeModal = true
    this.usersDbService.addUser(playerName)
  }
  changeCardValue(player: DocumentChange) {
  }
}
