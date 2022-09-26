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
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { ModalAskNameComponent } from './core/common/modal-ask-name/modal-ask-name.component';
import { ModalInvitePlayersComponent } from './core/common/modal-invite-players/modal-invite-players.component';
import { ModalSetupSettingsComponent } from './core/common/modal-setup-settings/modal-setup-settings.component';
import { ResultsComponent } from './core/game-session-view/poker-room/components/results/results.component';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule,
  AngularFireModule.initializeApp(environment.firebaseConfig),
  provideFirestore(() => getFirestore()),
  AngularFirestoreModule],


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
    ModalAskNameComponent,
    ModalInvitePlayersComponent,
    ModalSetupSettingsComponent,
    ResultsComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
