import { Component, VERSION } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  players: Observable<any[]>;

  constructor(firestore: AngularFirestore) {
    this.players = firestore.collection('players').valueChanges();
  }
}