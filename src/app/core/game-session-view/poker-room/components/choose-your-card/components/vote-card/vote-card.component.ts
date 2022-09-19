import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsersDbService } from 'src/services/users-db.service';

@Component({
  selector: 'app-vote-card',
  templateUrl: './vote-card.component.html',
  styleUrls: ['./vote-card.component.scss'],
})
export class VoteCardComponent implements OnInit {
  @Input()
  card: number;

  @Output()
  changeCardValue = new EventEmitter<number>()

  isSelected: boolean;

  constructor( private usersDbService: UsersDbService) {}

  ngOnInit() {}

  selectCard(cardValue: number) {
    this.changeCardValue.emit(cardValue)
  }
}
