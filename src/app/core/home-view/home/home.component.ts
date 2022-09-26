import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  message: string = 'Start new game';
 

  constructor(private router: Router) {}

  ngOnInit() { }

  goToSettingsView() {
    console.log('passe par la')
    this.router.navigateByUrl('new-game')
  }
}
