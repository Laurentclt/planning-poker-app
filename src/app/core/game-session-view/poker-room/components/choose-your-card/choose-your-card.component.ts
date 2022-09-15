import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-your-card',
  templateUrl: './choose-your-card.component.html',
  styleUrls: ['./choose-your-card.component.scss'],
})
export class ChooseYourCardComponent implements OnInit {
  cardValues: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor() {}

  ngOnInit() {}
}
