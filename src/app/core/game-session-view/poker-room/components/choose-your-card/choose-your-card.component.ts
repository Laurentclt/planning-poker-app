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
  players: Array<Player>
  currentSelectedCard: number;
  cardValues: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  constructor( private usersDbService: UsersDbService) {}

  ngOnInit() {}
  newCardValue(cardValue: number) {
    this.currentSelectedCard = cardValue
    this.updateCardValue()
  }
  updateCardValue() {
    let currentPlayer = this.usersDbService.currentUser
    this.usersDbService.updateUserCard(currentPlayer.id, this.currentSelectedCard)
  }
}
