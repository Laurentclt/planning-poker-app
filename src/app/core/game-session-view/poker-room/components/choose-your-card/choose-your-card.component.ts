import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { VoteCard } from 'src/app/models/voteCard.model';
import { UsersDbService } from 'src/services/users-db.service';

@Component({
  selector: 'app-choose-your-card',
  templateUrl: './choose-your-card.component.html',
  styleUrls: ['./choose-your-card.component.scss'],
})
export class ChooseYourCardComponent implements OnInit {
  @Input()
  currentPlayer: Player;
  cardValues: Array<VoteCard> = [];
  
  constructor( private usersDbService: UsersDbService) {}

  ngOnInit(): void {
    for (let cardValue of this.usersDbService.currentGameSession.voteSystem.values) {
      this.cardValues.push({cardValue})
    }
  }
  
  unselectCard(card: VoteCard) {
    console.log('unselect card')
    this.usersDbService.updateUserCard(this.currentPlayer.id, null)
    card.selected = false
  };
  selectCard(card: VoteCard) {
    let subscription = this.usersDbService.currentPlayer$.subscribe(player => {
      if (player.cardValue !== card.cardValue) {
        this.cardValues.forEach(card => card.selected = false)
        console.log("update card")
        card.selected = true
        this.usersDbService.updateUserCard(this.currentPlayer.id, card.cardValue)
      } else {
        this.unselectCard(card)
      }
      subscription.unsubscribe()
    })
    
  };
}
