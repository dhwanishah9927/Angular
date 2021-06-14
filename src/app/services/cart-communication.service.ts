import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartCommunicationService {

  newItemArrival: EventEmitter<number>;
  emptyCart: EventEmitter<boolean>;

  constructor() { 
    this.newItemArrival = new EventEmitter<number>();
    this.emptyCart = new EventEmitter<boolean>();
  }

  notifyCartForNewItem(){
    this.newItemArrival.emit(1);
  }

  emptyCartItems(){
    this.emptyCart.emit(true);
  }

}
