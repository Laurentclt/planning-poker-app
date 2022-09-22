import { Component, Input, OnInit } from '@angular/core';
import { UsersDbService } from '../../../../../../services/users-db.service';
import { Player } from '../../../../../models/player.model';

@Component({
  selector: 'app-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrls: ['./poker-table.component.scss'],
})
export class PokerTableComponent implements OnInit {
  // @Input()
  // players: Array<Player>;
  playersTop: Array<Player> = [];
  playersBottom: Array<Player> = [];
  playersLeft: Array<Player> = [];
  playersRight: Array<Player> = [];

  pickCard: string = 'pick your cards !';

  constructor(private usersDbService: UsersDbService) {
    
  }

  ngOnInit() {
    this.usersDbService.players.subscribe( data => {
      this.playersBottom =[];
      this.playersBottom.push(data[0], data[4], data[6], data[8], data[10], data[12])
      this.playersTop =[];
      this.playersTop.push(data[1], data[5], data[7], data[9], data[11], data[13])
      this.playersLeft =[];
      this.playersLeft.push(data[2])
      this.playersRight =[];
      this.playersRight.push(data[3])
      console.log(this.playersBottom)
    })
  }
  
  getPlayersFilter(players) {
    return players.filter(player => player);
  }
}

