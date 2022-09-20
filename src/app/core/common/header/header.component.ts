import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  route = this.router.url
  showModal: boolean = false;
  
  constructor(private router: Router) {}

  ngOnInit() {}

  toggleModal() {
    console.log('toogle')
    this.showModal = !this.showModal;
  }

 
}
