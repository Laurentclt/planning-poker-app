import { Injectable } from '@angular/core';
import { of, from, Observable, filter, } from 'rxjs';
import { Player } from '../app/models/player.model';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root',
})
export class UsersDbService {
  playersCollection: AngularFirestoreCollection<Player>;
  players: Observable<Player[]>;
  currentUser: Player;
  afs: AngularFirestore;

  constructor(afs: AngularFirestore) {
    this.playersCollection = afs.collection<Player>('players')
    this.players = afs.collection<Player>('players').valueChanges();
    this.afs = afs
  }
  
  addUser(playerName: string) {
    const id = this.afs.createId();
    const newPlayer: Player = { id, name: playerName, admin: false, cardValue: null };
    this.playersCollection.doc(id).set(Object.assign({}, newPlayer));
    this.currentUser = newPlayer
  }
  
  updateUserCard(id: string, value: number) {
    this.playersCollection.doc(id).update({cardValue: value })
  }

  deleteUser(id: string): void {
    this.playersCollection.doc(id).delete()
  }
}
