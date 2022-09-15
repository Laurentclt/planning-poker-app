import { Injectable } from '@angular/core';
import { of, from, Observable } from 'rxjs';
import { Player } from '../app/models/player.model';
@Injectable({
  providedIn: 'root',
})
export class UsersDbService {
  constructor() {}

  getUsers(): Observable<Array<Player>> {
    const players: Observable<Array<Player>> = of([
      {
        id: '1',
        name: 'Laurent',
        cardValue: 5,
        admin: true,
      },
      {
        id: '2',
        name: 'Jonathan',
        cardValue: 1,
        admin: false,
      },
      {
        id: '3',
        name: 'Alain',
        cardValue: 3,
        admin: false,
      },
    ]);
    return players;
  }

  addUser() {}
  updateUser() {}
  deleteUser() {}
}
