import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vote-card',
  templateUrl: './vote-card.component.html',
  styleUrls: ['./vote-card.component.scss'],
})
export class VoteCardComponent implements OnInit {
  @Input()
  card: number;
  isSelected: boolean;


  constructor() {}

  ngOnInit() {}

  toggleCard() {
    
  }
  
}
