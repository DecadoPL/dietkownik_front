import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Dish } from "../models/dish/dish.model";
import { DishDTO } from "../models/dish/dishDTO.model";
import { DishListItem } from "../models/dish/dishListItem.model";

@Injectable()
export class DishService{
  private url = environment.mainUrl + 'api/dishes/';

  constructor(private http: HttpClient){}

  getDishesList(): Observable<Array<DishListItem>>{
    return this.http.get<Array<DishListItem>>(this.url);
  }
  
  getDish(id: number): Observable<Dish>{
    return this.http.get<Dish>(this.url+id);
  }

  addDish(dish: DishDTO): Observable<DishDTO>{
    return this.http.post<DishDTO>(this.url+"addDish", dish);
  }

  updateDish(dish: DishDTO): Observable<DishDTO>{
    return this.http.post<DishDTO>(this.url+"updateDish", dish);
  }

  searchDishes(searchName: string): Observable<Array<DishListItem>>{
    return this.http.get<Array<DishListItem>>(this.url+'searchDishes/'+searchName);
  }

  deleteDish(id: number): Observable<any>{
    return this.http.delete(this.url+"deleteDish/"+id);
  }
 
}