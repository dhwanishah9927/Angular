import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FoodItem } from '../Model/FoodItem';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl: string;

  // foodItems: FoodItem[] = [
  //   {
  //     id: 1,
  //     restaurent_name: 'Garden',
  //     rating: 5,
  //     description: 'All raw organic vegetables',
  //     name: 'Vegetable Dish',
  //     image_url: 'https://images.unsplash.com/photo-1611864581049-aca018410b97?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=979&q=80',
  //     cost: 200
  //   },
  //   {
  //     id: 2,
  //     restaurent_name: 'Burger Queen',
  //     rating: 4.9,
  //     description: 'Veggie Burger',
  //     name: 'Dum Aloo Burger',
  //     image_url: 'https://images.unsplash.com/photo-1572460534958-99d1e796f160?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80',
  //     cost: 50
  //   },
  //   {
  //     id: 3,
  //     restaurent_name: 'Sweet King',
  //     rating: 5,
  //     description: 'Sweet Rolls of Cashew Nuts',
  //     name: 'Bakalava',
  //     image_url: 'https://images.unsplash.com/photo-1576521529275-f0f0d02a93b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80',
  //     cost: 500
  //   },
  //   {
  //     id: 4,
  //     restaurent_name: 'Shree Ji',
  //     rating: 4.5,
  //     description: 'Samosas and pudding with curry',
  //     name: 'Spicy Lunch',
  //     image_url: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
  //     cost: 750
  //   },
  //   {
  //     id: 5,
  //     restaurent_name: 'Punjab Dhaba',
  //     rating: 5.0,
  //     description: 'Paneer Sabji with Naan',
  //     name: 'Roti Sabji',
  //     image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1224&q=80',
  //     cost: 350
  //   },
  // ]

  constructor(
    private _http: HttpClient
  ) {
    this.baseUrl = 'http://localhost:3000';
  }

  getAllListings(){
    let url = this.baseUrl + '/foods'
    return this._http.get<FoodItem[]>(url);
  }

}
