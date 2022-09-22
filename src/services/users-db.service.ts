import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../app/models/player.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Collection } from 'src/app/models/collection.model';
import { Router } from '@angular/router';



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

  constructor(afs: AngularFirestore,  private router : Router ) {
    this.gameSessionsCollection = afs.collection<Collection>('game-sessions')
    this.afs = afs
    // if user refresh the page we are still able to find the database 
    if (this.router.url !== '/') {
      const id = this.router.url
      this.currentGameSessionId = id
      this.setPlayersObservable(id)
    }
    // if (localStorage.getItem('user')) {
    //   let userId = localStorage.getItem("user")
    //   const id = this.router.url
    //   this.setCurrentUser(id, userId)
    // }
  }
  setCurrentUser(id: string, userId: string) {
    this.gameSessionsCollection.doc(id)
      .collection('players').doc(userId).get().subscribe(data => this.currentUser = data)
  }
  createGameSession(): string {
    const id = this.afs.createId();
    const gameSessionId: Collection = {id}
    this.gameSessionsCollection.doc(id).set(gameSessionId)
    this.currentGameSessionId = id
    this.setPlayersObservable(id)
    return id
  }
  setPlayersObservable(id: string) {
    this.players = this.afs.collection<Collection>('game-sessions')
    .doc(id).collection<Player>('players').valueChanges()
  }

  addUser(playerName: string): void {
    // to do : first player created in the collection is admin
    console.log('adduser called', playerName)
    const playerId = this.afs.createId();
    const newPlayer: Player = { id: playerId, name: playerName, admin: this.isAdmin, cardValue: null };
    this.currentUser = newPlayer
    localStorage.setItem('user', newPlayer.id)
    this.gameSessionsCollection.doc(this.currentGameSessionId).collection<Player>('players').doc(playerId).set(newPlayer)
  }
  
  updateUserCard(id: string, value: number): void {
    this.gameSessionsCollection.doc(this.currentGameSessionId).collection<Player>('players').doc(id).update({cardValue: value })
  }

  deleteUser(id: string): void {
    this.gameSessionsCollection.doc(this.currentGameSessionId).collection('players').doc(id).delete()
    let playersPlaying: number;
    this.players.subscribe(data => {
      playersPlaying = data.length
      if (playersPlaying === 0) {
        console.log("suppression de la collection")
        this.gameSessionsCollection.doc(this.currentGameSessionId).delete()
      }
    } )
  }

}
