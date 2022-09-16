import { Component, Input, OnInit } from '@angular/core';
import { UsersDbService } from 'src/services/users-db.service';

@Component({
  selector: 'app-vote-card',
  templateUrl: './vote-card.component.html',
  styleUrls: ['./vote-card.component.scss'],
})
export class VoteCardComponent implements OnInit {
  @Input()
  card: number;
  isSelected: boolean;


  constructor( private usersDbService: UsersDbService) {}

  ngOnInit() {}

  toggleCard() {
    
  }
 
  
}
