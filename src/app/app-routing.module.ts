import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalSetupSettingsComponent } from './core/common/modal-setup-settings/modal-setup-settings.component';
import { PokerRoomComponent } from './core/game-session-view/poker-room/poker-room.component';
import { HomeComponent } from './core/home-view/home/home.component';

const routes: Routes = [
  
  { path: 'planning-poker-app', component: HomeComponent },
  { path: 'planning-poker-app/new-game', component: ModalSetupSettingsComponent },
  { path: 'planning-poker-app/:id', component: PokerRoomComponent },
  { path : "", redirectTo: "/planning-poker-app"},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
