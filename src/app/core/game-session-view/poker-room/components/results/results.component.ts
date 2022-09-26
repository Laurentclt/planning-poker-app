import { Component, OnInit } from '@angular/core';
import { UsersDbService } from 'src/services/users-db.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  noteAverage: Number;
  constructor( private usersDbService: UsersDbService) { }

  ngOnInit(): void {
    this.calculAverageNote()
  }

  calculAverageNote() : void {
    let sum: number = 0;
    this.usersDbService.players.subscribe(datas => {
      datas.forEach(data => {
      sum += data.cardValue
      });
    this.noteAverage = sum / datas.length
    })
  }
}
