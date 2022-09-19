import { Component, Input, OnInit } from '@angular/core';
import { UsersDbService } from '../../../../../../services/users-db.service';
import { Player } from '../../../../../models/player.model';

@Component({
  selector: 'app-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrls: ['./poker-table.component.scss'],
})
export class PokerTableComponent implements OnInit {
  @Input()
  players: Array<Player>;

  pickCard: string = 'pick your cards !';

  constructor(private usersDbService: UsersDbService) {}

  ngOnInit() {

  }
}
