import { Injectable } from '@angular/core';
import { Observable, sequenceEqual } from 'rxjs';
import { Player } from '../app/models/player.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Session } from 'src/app/models/session.model';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root',
})
export class UsersDbService {
  // playersCollection: AngularFirestoreCollection<Player>;
  afs: AngularFirestore;
  gameSessionsCollection: AngularFirestoreCollection<Session>;
  players: Observable<Player[]>;
  currentGameSession: Session;
  currentPlayer: Observable<Player>

  constructor(afs: AngularFirestore,  private router : Router ) {
    this.afs = afs
    this.gameSessionsCollection = afs.collection<Session>('game-sessions')
    if (this.router.url !== '/' && this.router.url !== '/new-game') {
      const id = this.router.url
      this.currentGameSession.id = id
      this.setPlayersObservable(id)
    }
  }
  setPlayersObservable(id: string) {
    this.players = this.afs.collection<Session>('game-sessions')
    .doc(id).collection<Player>('players').valueChanges()
  }
  setCurrentPlayer(id: string, userId: string) {
    this.currentPlayer = this.gameSessionsCollection.doc(id)
    .collection('players').doc(userId).valueChanges()
  }
  createGameSession(sessionName: string): string {
    const id = this.afs.createId();
    const gameSession: Session = {id, name: sessionName}
    this.gameSessionsCollection.doc(id).set(gameSession)
    this.currentGameSession = {id: id, name: sessionName}
    this.setPlayersObservable(id)
    console.log(sessionName)
    console.log(id)
    return id
  }
  addUser(playerName: string): void {
    // to do : first player created in the collection is admin
    console.log('adduser called', playerName)
    const playerId = this.afs.createId();
    const newPlayer: Player = { id: playerId, name: playerName, cardValue: null };
    // this.currentUser = newPlayer
    localStorage.setItem('user', newPlayer.id)
    this.gameSessionsCollection.doc(this.currentGameSession.id).collection<Player>('players').doc(playerId).set(newPlayer)
    this.setCurrentPlayer(this.currentGameSession.id, playerId)
  }
  
  updateUserCard(id: string, value: number): void {
    this.gameSessionsCollection.doc(this.currentGameSession.id).collection<Player>('players').doc(id).update({cardValue: value })
  }

  deleteUser(id: string): void {
    this.gameSessionsCollection.doc(this.currentGameSession.id).collection('players').doc(id).delete()
    let playersPlaying: number;
    this.players.subscribe(data => {
      playersPlaying = data.length
      if (playersPlaying === 0) {
        console.log("suppression de la collection")
        this.gameSessionsCollection.doc(this.currentGameSession.id).delete()
      }
    } )
  }

}
