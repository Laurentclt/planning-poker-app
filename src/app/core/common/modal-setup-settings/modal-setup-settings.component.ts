import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersDbService } from 'src/services/users-db.service';

@Component({
  selector: 'app-modal-setup-settings',
  templateUrl: './modal-setup-settings.component.html',
  styleUrls: ['./modal-setup-settings.component.scss']
})
export class ModalSetupSettingsComponent implements OnInit {
  sessionName: string;
  message : string = 'Create session'
  gameUrl: string;
  showModal: boolean = true;
  constructor(private usersDbService:UsersDbService, private router: Router) {
   
   }

  ngOnInit(): void {}

  createGameSession(sessionName: string ): void {
    // change function parameters
    this.gameUrl = this.usersDbService.createGameSession(sessionName)
    this.router.navigateByUrl(this.gameUrl)
  }
}
