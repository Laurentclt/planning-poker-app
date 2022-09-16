import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
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
    this.usersDbService.playersCollection.snapshotChanges()
    .pipe(map(changes => changes.map(c => ({ id : c.payload.doc.id, ...c.payload.doc.data()}))))
    .subscribe( data => {this.players = data})
  }

  addUser() {
    this.usersDbService.addUser()
  }
}
