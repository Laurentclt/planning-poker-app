import { Component, OnInit } from '@angular/core';
import { UsersDbService } from '../../../../../../services/users-db.service';
import { Player } from '../../../../../models/player.model';

@Component({
  selector: 'app-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrls: ['./poker-table.component.scss'],
})
export class PokerTableComponent implements OnInit {
  pickCard: string = 'pick your cards !';
  players: Array<Player>;

  constructor(private usersDbService: UsersDbService) {}

  ngOnInit() {
    this.usersDbService.getUsers().subscribe((data) => (this.players = data));
  }
}
