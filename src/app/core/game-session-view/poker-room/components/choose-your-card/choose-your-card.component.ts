import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { UsersDbService } from 'src/services/users-db.service';

@Component({
  selector: 'app-choose-your-card',
  templateUrl: './choose-your-card.component.html',
  styleUrls: ['./choose-your-card.component.scss'],
})
export class ChooseYourCardComponent implements OnInit {
  currentSelectedCard: number;
  classical: Array<number> = [1, 2, 3, 5, 8, 13, 20, 30]
  cardValues: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  constructor( private usersDbService: UsersDbService) {}

  ngOnInit() {}
  
  updateCardValue(): void {
    let currentPlayer: Player;
    this.usersDbService.currentPlayer.subscribe(data => {
     currentPlayer = data
     this.usersDbService.updateUserCard(currentPlayer.id, this.currentSelectedCard)
    });
  }
  selectCard(cardValue: number) {
    this.currentSelectedCard = cardValue
    this.updateCardValue()
  }
}
