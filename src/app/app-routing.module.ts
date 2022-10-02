import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalSetupSettingsComponent } from './core/common/modal-setup-settings/modal-setup-settings.component';
import { PokerRoomComponent } from './core/game-session-view/poker-room/poker-room.component';
import { HomeComponent } from './core/home-view/home/home.component';

const routes: Routes = [
  { path: 'planning-poker-app', component: HomeComponent, children: [
    { path: 'new-game', component: ModalSetupSettingsComponent },
    { path: ':id', component: PokerRoomComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
