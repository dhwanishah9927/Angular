import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginCommunicationService {

  userLoggedIn: EventEmitter<any>;

  constructor() { 
    this.userLoggedIn = new EventEmitter<any>();
  }

  raiseLoginEvent(): void {
    this.userLoggedIn.emit(true);
  }

  raiseLogoutEvent(): void {
    this.userLoggedIn.emit(false);
  }

}
