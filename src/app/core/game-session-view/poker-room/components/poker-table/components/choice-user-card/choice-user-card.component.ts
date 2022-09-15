import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../../../../../../../models/player.model';

@Component({
  selector: 'app-choice-user-card',
  templateUrl: './choice-user-card.component.html',
  styleUrls: ['./choice-user-card.component.scss'],
})
export class ChoiceUserCardComponent implements OnInit {
  @Input()
  player: Player;

  constructor() {}

  ngOnInit() {}
}
