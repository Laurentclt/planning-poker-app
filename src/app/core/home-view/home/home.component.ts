import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersDbService } from 'src/services/users-db.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  message: string = 'Start new game';
 

  constructor(private router: Router, private usersDbService: UsersDbService) {}

  ngOnInit() {
    this.usersDbService.currentGameSession = {}
    localStorage.removeItem('user')
   }

  goToSettingsView() {
  this.router.navigateByUrl('new-game')
  }
}
