import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PokerRoomComponent } from './core/game-session-view/poker-room/poker-room.component';
import { PokerTableComponent } from './core/game-session-view/poker-room/components/poker-table/poker-table.component';
import { ChooseYourCardComponent } from './core/game-session-view/poker-room/components/choose-your-card/choose-your-card.component';
import { ChoiceUserCardComponent } from './core/game-session-view/poker-room/components/poker-table/components/choice-user-card/choice-user-card.component';
import { HeaderComponent } from './core/common/header/header.component';
import { VoteCardComponent } from './core/game-session-view/poker-room/components/choose-your-card/components/vote-card/vote-card.component';
import { ButtonComponent } from './core/common/button/button.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './core/home-view/home/home.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideFirestore(() => getFirestore())],
  declarations: [
    AppComponent,
    PokerRoomComponent,
    PokerTableComponent,
    ChooseYourCardComponent,
    ChoiceUserCardComponent,
    HeaderComponent,
    VoteCardComponent,
    ButtonComponent,
    HomeComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
