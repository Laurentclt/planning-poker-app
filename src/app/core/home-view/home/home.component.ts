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
  gameUrl: string;

  constructor(private usersDbService: UsersDbService, private router: Router) {}

  ngOnInit() { }

  createGameSession(): void {
    this.gameUrl = this.usersDbService.createGameSession()
    this.router.navigateByUrl(this.gameUrl)
  }
}
