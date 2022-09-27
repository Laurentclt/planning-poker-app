import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VoteSystem } from 'src/app/models/voteSystem.model';
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

  showSuggestions: boolean = false;
  suggestions = [{id:"classic",name: "classic", values: [1, 2, 3, 5, 8, 13, 20, 30]},
   {id:"oneTen", name: 'one to ten scale', values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}];
  systemSelected: VoteSystem = this.suggestions[0];
  systemVote: string = `${this.suggestions[0].name}: (${this.suggestions[0].values})`;
  
   constructor(private usersDbService:UsersDbService, private router: Router) {
   
   }

  ngOnInit(): void {}

  createGameSession(sessionName: string ): void {
    // change function parameters
    this.gameUrl = this.usersDbService.createGameSession(sessionName, this.systemSelected);
    this.router.navigateByUrl(this.gameUrl);
  }


  suggest() {
    this.showSuggestions = true;
  }

  selectSuggestion(system: VoteSystem) {
    this.systemVote = `${system.name} : (${system.values})`;
    this.showSuggestions = false;
    this.systemSelected = system;
  }
}

