import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


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



  constructor() {}

  ngOnInit() {}
}
