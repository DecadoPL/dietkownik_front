import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ShoppingListItem } from "../models/shoppingListItem.model";

@Injectable()
export class ShoppingListService{
  private url = environment.mainUrl + 'api/shoppinglist/';

  constructor(private http: HttpClient){}

  saveShoppingList(shoppingList: ShoppingListItem[]): Observable<ShoppingListItem[]>{
    return this.http.post<ShoppingListItem[]>(this.url+"saveShoppingList", shoppingList);
  }

  GetShoppingListForDiets(ids: number[]): Observable<ShoppingListItem[]>{
    return this.http.get<ShoppingListItem[]>(this.url+ids.join(","));
  }

  getShoppingList(userId: number): Observable<ShoppingListItem[]>{
    return this.http.get<ShoppingListItem[]>(this.url+"user/"+userId);
  }

}