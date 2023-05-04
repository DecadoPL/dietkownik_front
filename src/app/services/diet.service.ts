import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Diet } from "../models/diet/diet.model";
import { DietListItem } from "../models/diet/dietListItem.model";
import { ShoppingListItem } from "../models/shoppingList/shoppingListItem.model";

@Injectable()
export class DietService{
  private url = environment.mainUrl + 'api/diets/';

  constructor(private http: HttpClient){}

  getDietsList(): Observable<Array<DietListItem>>{
    return this.http.get<Array<DietListItem>>(this.url);
  }
  
  getDiet(id: number): Observable<Diet>{
    return this.http.get<Diet>(this.url+id);
  }

  addDiet(diet: Diet): Observable<Diet>{
    return this.http.post<Diet>(this.url+"addDiet", diet);
  }

  updateDiet(diet: Diet): Observable<Diet>{
    return this.http.post<Diet>(this.url+"updateDiet", diet);
  }

  searchDiets(searchName: string): Observable<Array<Diet>>{
    return this.http.get<Array<Diet>>(this.url+searchName);
  }

  getDietShoppingList(id: number): Observable<Array<ShoppingListItem>>{
    return this.http.get<Array<ShoppingListItem>>(this.url+"shoppinglist/"+id);
  }

  deleteDiet(id: number): Observable<any>{
    return this.http.delete(this.url+"deleteDiet/"+id);
  }
}