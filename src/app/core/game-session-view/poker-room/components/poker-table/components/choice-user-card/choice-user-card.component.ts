import { Component, OnInit, Input } from '@angular/core';
import { UsersDbService } from 'src/services/users-db.service';
import { Player } from '../../../../../../../models/player.model';



@Component({
  selector: 'app-choice-user-card',
  templateUrl: './choice-user-card.component.html',
  styleUrls: ['./choice-user-card.component.scss'],
})
export class ChoiceUserCardComponent implements OnInit {
  @Input()
  player: Player;
  @Input()
  revealCard: boolean;

  constructor(private usersDbService: UsersDbService) {}

  ngOnInit() {
  }

  deleteUser(data: Player): void {
     this.usersDbService.deleteUser(data.id)
  }
  // updateCard(data: Player) {
  //   this.usersDbService.updateUser(data.id, data.cardValue + 1)
  // }
}
