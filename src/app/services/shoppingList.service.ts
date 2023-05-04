import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ShoppingListItem } from "../models/shoppingList/shoppingListItem.model";
import { ShoppingList } from "../models/shoppingList/shoppingList.model";
import { ShoppingListListItem } from "../models/shoppingList/shoppingListListItem";

@Injectable()
export class ShoppingListService{
  private url = environment.mainUrl + 'api/shoppinglist/';

  constructor(private http: HttpClient){}

  saveShoppingList(shoppingList: ShoppingList): Observable<ShoppingList>{
    return this.http.post<ShoppingList>(this.url+"saveShoppingList", shoppingList);
  }

  getShoppingListForDiets(ids: number[]): Observable<ShoppingListItem[]>{
    return this.http.get<ShoppingListItem[]>(this.url+"diets/"+ids.join(","));
  }

  getShoppingList(id: number): Observable<ShoppingList>{
    return this.http.get<ShoppingList>(this.url+id);
  }

  deleteShoppingList(id: number): Observable<any>{
    return this.http.delete(this.url+"deleteShoppingList/"+id);
  }

  deleteShoppingListItem(id: number, item: ShoppingListItem): Observable<any>{
    return this.http.delete(this.url+"deleteShoppingList/"+id+"/"+item.name+"/"+item.portionName);
  }

  getShoppingLists(): Observable<ShoppingListListItem[]>{
    return this.http.get<ShoppingListListItem[]>(this.url);
  }

}