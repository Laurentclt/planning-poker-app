import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  message: string = 'Start new game';
  gameUrl: string = '1'

  constructor() {}

  ngOnInit() { }
}
