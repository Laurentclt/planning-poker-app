import { Injectable } from '@angular/core';
import { of, from, Observable, filter, } from 'rxjs';
import { Player } from '../app/models/player.model';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root',
})
export class UsersDbService {
  playersCollection: AngularFirestoreCollection<Player>;
  players: Observable<Player[]>

  constructor(afs: AngularFirestore) {
    this.playersCollection = afs.collection<Player>('players')
    this.players = afs.collection<Player>('players').valueChanges();
  }

  // getUsers(): Observable<Player> {
  //   // return this.players
  //   // return  this.playersCollection.snapshotChanges()
  //   //   .pipe(map(changes => changes.map(c => ({ id : c.payload.doc.id, ...c.payload.doc.data()}))))
  // }
  
   
  addUser() {
    this.playersCollection
    .add({admin: false, cardValue: 5, name: "test"})
  }
  updateUser(id: string, value: number) {
    this.playersCollection.doc(id).update({cardValue: value })
  }

  deleteUser(id: string): void {
    this.playersCollection.doc(id).delete()
  }
}
