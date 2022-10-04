import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player.model';


import { UsersDbService } from 'src/services/users-db.service';

@Component({
  selector: 'app-poker-room',
  templateUrl: './poker-room.component.html',
  styleUrls: ['./poker-room.component.scss'],
})
export class PokerRoomComponent implements OnInit {
  currentPlayer$: Observable<Player>;
  playerName: string;
  closeModalAskName: boolean;
  gameIsOver: boolean;
  isComponentReady: boolean = false;
  

  constructor( private usersDbService: UsersDbService) {}

  ngOnInit() {
        if (localStorage.getItem('userId')) {
        this.closeModalAskName = true;
        this.isComponentReady = true;
        this.setCurrentPlayer()
      } else {
        this.closeModalAskName = false;
      }  
    this.showResults()
    this.resetView()
  }
  getPlayerName(playerName : string): void {
    this.playerName = playerName
    this.closeModalAskName = true
    this.usersDbService.addUser(playerName)
    this.setCurrentPlayer()
    this.isComponentReady = true;
  }

  setCurrentPlayer() {
    let currentUserId: string = localStorage.getItem('userId');
    this.usersDbService.currentGameSession$.subscribe(data => {
      let gameSessionId =  data.id
      this.currentPlayer$ = this.usersDbService.gameSessionsCollection
      .doc(gameSessionId).collection('players').doc(currentUserId).valueChanges();
      this.usersDbService.currentPlayer$ = this.currentPlayer$
    })
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
