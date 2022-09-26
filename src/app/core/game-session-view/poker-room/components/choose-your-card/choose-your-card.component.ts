import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player.model';

import { UsersDbService } from 'src/services/users-db.service';

@Component({
  selector: 'app-choose-your-card',
  templateUrl: './choose-your-card.component.html',
  styleUrls: ['./choose-your-card.component.scss'],
})
export class ChooseYourCardComponent implements OnInit {
  @Input()
  currentPlayer: Player;
  classical: Array<number> = [1, 2, 3, 5, 8, 13, 20, 30]
  cardValues: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  constructor( private usersDbService: UsersDbService) {}

  ngOnInit() {}
  
  unselectCard() {
    console.log('unselect card to do when find how style choice card')
    this.usersDbService.updateUserCard(this.currentPlayer.id, null)
  };
  selectCard(cardValue: number) {
    if (this.currentPlayer.cardValue !== cardValue) {
      console.log("update card")
      console.log(this.currentPlayer)
      this.usersDbService.updateUserCard(this.currentPlayer.id, cardValue)
    } else {
      this.unselectCard()
    }
  };
}
