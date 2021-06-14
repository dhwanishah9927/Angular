import { Component, OnInit } from '@angular/core';
import { LoginCommunicationService } from '../services/login-communication.service';
import { FoodItem } from '../Model/FoodItem';
import { HomeService } from '../services/home.service';
import { OrderService } from '../services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { AddToCartDialogComponent } from '../order/add-to-cart-dialog/add-to-cart-dialog.component';
import { UserService } from '../services/user.service';
import { Order } from '../Model/Order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  foodItems: FoodItem[] = [];
  allFoodItems: FoodItem[] = [];
  filterString: string = '';
  itemInDialogBox: FoodItem | undefined;
  dialogBoxFoodItem: string = '';
  isLoading: boolean = true;

  constructor(
    private _loginCommunication: LoginCommunicationService,
    private _homeService: HomeService,
    private _orderService: OrderService,
    private _userService: UserService,
    private dialog: MatDialog,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.filterString =  '';
    this.isLoading = true;
    this._loginCommunication.raiseLoginEvent();
    this._homeService.getAllListings().subscribe(res => {
        this.allFoodItems = res;
        this.foodItems = this.allFoodItems;
        this.isLoading = false;
      },
      (error) => {
        console.log('error in getting food items: '+error)
      }
    );
    this.dialogBoxFoodItem = '';
  }

  filterBy(value: any){
    let tempList = this.allFoodItems;
    if(value.length > 0){
      let filtered = tempList.filter((item: FoodItem) => {
        return (item.name.toLowerCase().includes(value.toLowerCase()) ||
                item.restaurent_name.toLowerCase().includes(value.toLowerCase()) ||
                item.rating == value ||
                item.cost == value);
      })
      this.foodItems = filtered;
    } else{
      this.foodItems = this.allFoodItems;
    }
  }

  addItemToDialogBox(item: FoodItem){
    // this.itemInDialogBox = item;
    let foodItem = item.name + ' | ' + item.cost;

    const dialogRef = this.dialog.open(AddToCartDialogComponent, {
      width: '500px',
      data: {item: foodItem}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        this._orderService.addItemToCart(item);
      }
    });

  }

  removeItemFromDialogBox(){
    this.itemInDialogBox = undefined;
  }

  buyThisItem(item: any){
    let id = this._userService.getCurrentUser()?.id;
    if(id != undefined){
      let newOrder: Order = {
        id: this.generateNewOrderId(),
        status: 'Placed',
        remainingTime: 25,
        userId:id,
        orderTotal: item.cost
      }
      this._router.navigate(['/orders',], {state: newOrder});
    } else{
      console.log('error occurred in placing order');
    }
  }

  generateNewOrderId() {
    return Math.floor(Math.random() * (1000000 - 100000 + 1) + 100000);
  }

}
