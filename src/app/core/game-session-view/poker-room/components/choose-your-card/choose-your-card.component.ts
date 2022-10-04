import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  currentPlayer$: Observable<Player>;
  cardValues: Array<VoteCard> = [];
  
  constructor( private usersDbService: UsersDbService) {}

  ngOnInit(): void {
    if (this.cardValues.length === 0) {
      let cardArray: Array<number>;
      let subscription = this.usersDbService.currentGameSession$.subscribe(data => {
      cardArray = data.voteSystem.values;
      for (let cardValue of cardArray) {
        this.cardValues.push({cardValue})
      };
      subscription.unsubscribe()
      console.log(this.cardValues)
      });
  };
  }
  
  unselectCard(card: VoteCard) {
    console.log('unselect card')
    let userId: string;
    this.currentPlayer$.subscribe(data => userId = data.id)
    this.usersDbService.updateUserCard( userId, null)
    card.selected = false
  };
  selectCard(card: VoteCard) {
    let subscription = this.currentPlayer$.subscribe(player => {
      if (player.cardValue !== card.cardValue) {
        this.cardValues.forEach(card => card.selected = false)
        console.log("update card")
        card.selected = true
        this.usersDbService.updateUserCard(player.id, card.cardValue)
      } else {
        this.unselectCard(card)
      }
      subscription.unsubscribe()
    })
    
  };
}
