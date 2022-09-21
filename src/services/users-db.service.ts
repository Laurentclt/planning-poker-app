import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../app/models/player.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Collection } from 'src/app/models/collection.model';



@Injectable({
  providedIn: 'root',
})
export class UsersDbService {
  // playersCollection: AngularFirestoreCollection<Player>;
  players: Observable<Player[]>;
  currentUser: Player;
  afs: AngularFirestore;
  adminPlayer: Player;
  isAdmin: boolean = false;

  gameSessionsCollection: AngularFirestoreCollection<Collection>;
  currentGameSessionId: string;

  constructor(afs: AngularFirestore) {
    this.gameSessionsCollection = afs.collection<Collection>('game-sessions')
    this.players = afs.collection<Collection>('game-sessions').doc(this.currentGameSessionId).collection<Player>('players').valueChanges()
    this.afs = afs
  }
  createGameSession(): string {
    const id = this.afs.createId();
    const gameSessionId: Collection = {id}
    this.gameSessionsCollection.doc(id).set(gameSessionId)
    this.currentGameSessionId = id
    return id
  }

  addUser(playerName: string): void {
    // to do : first player created in the collection is admin
    const playerId = this.afs.createId();
    const newPlayer: Player = { id: playerId, name: playerName, admin: this.isAdmin, cardValue: null };
    this.currentUser = newPlayer
    this.gameSessionsCollection.doc(this.currentGameSessionId).collection<Player>('players').doc(playerId).set(newPlayer)
    
  }
  
  updateUserCard(id: string, value: number): void {
    this.gameSessionsCollection.doc(this.currentGameSessionId).collection<Player>('players').doc(id).update({cardValue: value })
  }

  deleteUser(id: string): void {
    this.gameSessionsCollection.doc(this.currentGameSessionId).collection('players').doc(id).delete()
  }

  
}
