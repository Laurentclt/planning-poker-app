import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VoteCard } from 'src/app/models/voteCard.model';


@Component({
  selector: 'app-vote-card',
  templateUrl: './vote-card.component.html',
  styleUrls: ['./vote-card.component.scss'],
})
export class VoteCardComponent implements OnInit {
  @Input()
  card: VoteCard;

  @Output()
  changeCardValue = new EventEmitter<number>()
  
  // selected: boolean = false;

  constructor() {}

  ngOnInit() {}
}
