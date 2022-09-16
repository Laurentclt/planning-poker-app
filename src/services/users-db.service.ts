import { Injectable } from '@angular/core';
import { of, from, Observable, filter, } from 'rxjs';
import { Player } from '../app/models/player.model';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { collection, collectionData, Firestore, doc} from "@angular/fire/firestore";
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root',
})
export class UsersDbService {
  playersCollection: AngularFirestoreCollection<Player>;
  players: Observable<unknown[]>

  constructor(afs: AngularFirestore) {
    this.playersCollection = afs.collection<Player>('players')
    this.players = afs.collection<Player>('players').valueChanges();
  }

  getUsers() {
    return this.players
  }
  // getUsers(): Observable<Player[]> {
  //   const playerRef = collection(this.firestore, 'players')
  //   return collectionData(playerRef, { idField: 'id'}) as Observable<Player[]>
  // }
   
  addUser() {
    return this.playersCollection
    .add({admin: false, cardValue: 5, name: "test"})
  }
  updateUser(id: string, value: number) {
    this.playersCollection.doc(id).update({cardValue: value })
  }

  deleteUser(id: string): void {
    this.playersCollection.doc(id).delete()
  }
}
