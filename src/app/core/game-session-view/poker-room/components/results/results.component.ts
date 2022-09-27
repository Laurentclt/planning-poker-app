import { Component, OnInit } from '@angular/core';
import { UsersDbService } from 'src/services/users-db.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  noteAverage: Number;
  preciseNote: Number;   
  constructor( private usersDbService: UsersDbService) { }

  ngOnInit(): void {
    this.calculAverageNote()
    this.calculPreciseNote()
    
  }

  calculAverageNote() : void {
    let sum: number = 0;
    this.usersDbService.players.subscribe(players => {
      players.forEach(player => {
        console.log(player)
      sum += player.cardValue
      });
      this.noteAverage = sum / players.length
    })
  }
  calculPreciseNote() : void{
    let sum: number = 0;
    let result: number;
    let allNotes: Array<number> = [];
    this.usersDbService.players.subscribe(players => {
      players.forEach(player => {
        allNotes.push(player.cardValue)
      })
      if (allNotes.length >= 3) {
      allNotes.sort(function(a, b){return a - b})
      allNotes.shift()
      allNotes.pop()
      allNotes.forEach(note => {
      result = sum += note
      })
      this.preciseNote = result
      } else {
      this.preciseNote = this.noteAverage
      }
    })
  }
}
