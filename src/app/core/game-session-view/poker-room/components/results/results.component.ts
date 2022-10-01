import { Component, OnInit } from '@angular/core';
import { UsersDbService } from 'src/services/users-db.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  noteAverage: number;
  preciseNote: number; 
 
  constructor( private usersDbService: UsersDbService) { }

  ngOnInit(): void {
    console.log('results showed')
    this.calculAverageNote()
    this.calculPreciseNote()
  }

  calculAverageNote() : void {
    let sum: number = 0;
    let allNotes: Array<number> = [];
    let subscription = this.usersDbService.players$.subscribe(players => {
      players.forEach(player => {
        let note = player.cardValue
        if (note !== null) {
          allNotes.push(note)
          sum += note
      }
      });
      this.noteAverage = sum / allNotes.length
      console.log('moyenne : ', this.noteAverage)
      subscription.unsubscribe()
    })
  }
  calculPreciseNote() : void{
    let sum: number = 0;
    let result: number;
    let allNotes: Array<number> = [];
    let subscription = this.usersDbService.players$.subscribe(players => {
      players.forEach(player => {
        if (player.cardValue !== null) {
        allNotes.push(player.cardValue)
        }
        })
        if (allNotes.length >= 3) {
        allNotes.sort(function(a, b){return a - b})
        allNotes.shift()
        allNotes.pop()
        allNotes.forEach(note => {
        result = sum += note
        })
      this.preciseNote = result / allNotes.length
      } else {
      this.preciseNote = this.noteAverage
      }
      subscription.unsubscribe()
    })
  }
}
