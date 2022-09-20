import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../app/models/player.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


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
    // to do : first player created in the collection is admin
    // this.afs.collection('players' , ref => ref.limit(1))
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
