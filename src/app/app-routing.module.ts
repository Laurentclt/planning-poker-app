import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokerRoomComponent } from './core/game-session-view/poker-room/poker-room.component';
import { HomeComponent } from './core/home-view/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'game/:id', component: PokerRoomComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
