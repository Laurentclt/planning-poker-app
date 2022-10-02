import { Component, Input, OnInit, OnChanges, Output, EventEmitter} from '@angular/core';
import { UsersDbService } from '../../../../../../services/users-db.service';
import { Player } from '../../../../../models/player.model';

@Component({
  selector: 'app-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrls: ['./poker-table.component.scss'],
})
export class PokerTableComponent implements OnInit {
  @Input()
  currentPlayer: Player;
  @Input()
  gameIsOver: boolean;

  @Output()
  emitGameOver = new EventEmitter();

  @Output()
  startNewGame = new EventEmitter();

  playersTop: Array<Player> = [];
  playersBottom: Array<Player> = [];
  playersLeft: Array<Player> = [];
  playersRight: Array<Player> = [];

  message: string = 'pick your cards !';
  buttonRevealCard: boolean = false;
  revealCards: boolean;


  constructor(private usersDbService: UsersDbService) { }

  ngOnInit(): void {
    this.cardsPlacement()
  }
  ngOnChanges(): void {
    this.switchToButton()
  }
  
  getPlayersFilter(players): Player[] {
    return players.filter(player => player);
  }
  showAnswers(): void {
    this.revealCards = true
    console.log(this.revealCards)
    this.goToResults()
  }
  cardsPlacement(): void {
    this.usersDbService.players$.subscribe( data => {
      this.playersBottom =[];
      this.playersBottom.push(data[0], data[2], data[6], data[8], data[10], data[12], data[16], data[18])
      this.playersTop =[];
      this.playersTop.push(data[1], data[3], data[7], data[9], data[11], data[13], data[17], data[19])
      this.playersLeft =[];
      this.playersLeft.push(data[4], data[14])
      this.playersRight =[];
      this.playersRight.push(data[5], data[15])
    })
  }
  switchToButton(): void {
    if (this.usersDbService.currentPlayer$ !== undefined) {
    this.usersDbService.currentPlayer$.subscribe(data => {
      if (data.cardValue !== null ) {
        this.buttonRevealCard = true
      } else {
        this.buttonRevealCard = false
      }
    })
  }
  }
  goToResults(): void {
    this.emitGameOver.emit()
  }
  resetAll(): void {
    this.revealCards = false
    this.startNewGame.emit();
    this.usersDbService.resetAllPlayers();
  }
}

