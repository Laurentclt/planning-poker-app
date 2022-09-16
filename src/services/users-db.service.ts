import { Injectable } from '@angular/core';
import { of, from, Observable } from 'rxjs';
import { Player } from '../app/models/player.model';
import { AngularFirestore, AngularFirestoreCollection,  } from '@angular/fire/compat/firestore';
import { collection, collectionData, Firestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root',
})
export class UsersDbService {
  playersCollection: AngularFirestoreCollection<Player>;
  players: Observable<unknown[]>

  constructor(afs: AngularFirestore) {
    this.playersCollection = afs.collection('players')
    this.players = afs.collection('players').valueChanges();
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
  updateUser() {}

  deleteUser() {
    
  }
}
