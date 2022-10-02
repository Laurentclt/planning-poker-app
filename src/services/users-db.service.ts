import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../app/models/player.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Session } from 'src/app/models/session.model';
import { Router } from '@angular/router';
import { VoteSystem } from 'src/app/models/voteSystem.model';



@Injectable({
  providedIn: 'root',
})
export class UsersDbService {
  afs: AngularFirestore;
  gameSessionsCollection: AngularFirestoreCollection<Session>;
  players$: Observable<Player[]>;
  currentGameSession: Session;
  currentGameSession$: Observable<Session>;
  currentPlayer$: Observable<Player>;
 

  constructor(afs: AngularFirestore,  private router : Router ) {
    this.afs = afs
    this.gameSessionsCollection = afs.collection<Session>('game-sessions')
    this.setGameSession()
  }

 
  setGameSession() {
    if (this.router.url !== '/planning-poker-app' && this.router.url !== '/planning-poker-app/new-game') {
      const id = this.router.url
      this.currentGameSession$ = this.gameSessionsCollection.doc(id).valueChanges()
      this.currentGameSession$.subscribe(data => {
        console.log("game session:", data)
        this.currentGameSession = data
      })
      this.setPlayersObservable(id)
      this.watchReset(id)
    }
  }
  watchReset(id: string) {
  this.gameSessionsCollection.doc(id).valueChanges()
    .subscribe(data => {
      if (data.reset === true) {
        this.resetPlayerCard()
      }
    })
  }
  setPlayersObservable(id: string): void{
    this.players$ = this.afs.collection<Session>('game-sessions')
    .doc(id).collection<Player>('players').valueChanges()
  }
  setCurrentPlayer(id: string, userId: string): void {
    this.currentPlayer$ = this.gameSessionsCollection.doc(id)
    .collection('players').doc(userId).valueChanges()
  }
  createGameSession(sessionName: string, system: VoteSystem): string {
    const id = this.afs.createId();
    const gameSession: Session = {id, name: sessionName, voteSystem: system, reset: false, showCards: false}
    this.gameSessionsCollection.doc(id).set(gameSession)
    this.currentGameSession = gameSession
    this.currentGameSession$ = this.gameSessionsCollection.doc(id).valueChanges()
    this.setPlayersObservable(id)
    this.watchReset(id)
    return id
  }
  resetGameSession(): void {
    this.resetPlayerCard()
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
  
  updateUserCard(playerId: string, value: number): void {
    this.gameSessionsCollection.doc(this.currentGameSession.id).collection<Player>('players').doc(playerId).update({cardValue: value })
  }

  deleteUser(id: string): void {
    this.gameSessionsCollection.doc(this.currentGameSession.id).collection('players').doc(id).delete()
    let playersPlaying: number;
    this.players$.subscribe(data => {
      playersPlaying = data.length
      if (playersPlaying === 0) {
        console.log("suppression de la collection")
        this.gameSessionsCollection.doc(this.currentGameSession.id).delete()
      }
    } )
  }
  showPlayersCard() {
    console.log('passe ici')
    this.gameSessionsCollection.doc(this.currentGameSession.id).update({showCards: true})
  }
  resetAllPlayers() {
    this.gameSessionsCollection.doc(this.currentGameSession.id).update({reset: true, showCards: false})
    }
  resetPlayerCard(): void {
    let id: string;
    let subscription = this.currentPlayer$.subscribe(player => {
      id = player.id
      if (player.cardValue !== null) {
      this.gameSessionsCollection.doc(this.currentGameSession.id).collection('players').doc(id).update({cardValue: null})
      }
      subscription.unsubscribe()
      this.gameSessionsCollection.doc(this.currentGameSession.id).update({reset: false})
    })
  }
}
