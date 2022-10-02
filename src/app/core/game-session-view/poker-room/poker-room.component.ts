import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player.model';

import { UsersDbService } from 'src/services/users-db.service';

@Component({
  selector: 'app-poker-room',
  templateUrl: './poker-room.component.html',
  styleUrls: ['./poker-room.component.scss'],
})
export class PokerRoomComponent implements OnInit {
  currentPlayer: Player;
  playerName: string;
  closeModal: boolean;
  gameIsOver: boolean;
  isComponentReady: boolean = false;
  

  constructor( private usersDbService: UsersDbService) {}

  ngOnInit() {
      if (this.usersDbService.currentPlayer$ === undefined) {
        this.closeModal = false
      } else {
        this.closeModal = true
      }
    // this.usersDbService.currentPlayer$.subscribe(data => {
    //   if (data.id !== undefined) {
    //     this.closeModal = false
    //   } else {
    //     this.closeModal = true
    //   }
    // })  
    this.showResults()
    this.resetView()
  }
  getPlayerName(playerName : string): void {
    this.playerName = playerName
    this.closeModal = true
    this.usersDbService.addUser(playerName)
    this.setCurrentPlayer()
    this.isComponentReady = true;
  }

  setCurrentPlayer() {
    this.usersDbService.currentPlayer$.subscribe(data => this.currentPlayer = data)
  }
  showResults() {
   this.usersDbService.currentGameSession$.subscribe(data => {
    if (data.showCards === true) {
      this.gameIsOver = true
    }
   })
  }
  resetView() {
    this.usersDbService.currentGameSession$.subscribe(data => {
      if (data.showCards === false) {
        this.gameIsOver = false
      }
     })
  }
}
