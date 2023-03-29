import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Ingredient } from "../models/ingredient/ingredient.model";
import { IngredientListItem } from "../models/ingredient/ingredientListItem.model";


@Injectable()
export class IngredientService{
  private url = environment.mainUrl + 'api/ingredients/';

  constructor(private http: HttpClient){}


  getIngredient(id: number): Observable<Ingredient>{
    return this.http.get<Ingredient>(this.url+id);
  }

  deleteIngredient(id: number): Observable<any>{
    return this.http.delete(this.url+"deleteIngredient/"+id);
  }

  searchIngredients(searchName: string): Observable<Array<IngredientListItem>> {
    return this.http.get<Array<IngredientListItem>>(this.url+ 'searchIngredients/' + searchName);
  }

  getIngredientsList(): Observable<Array<IngredientListItem>>{
    return this.http.get<Array<IngredientListItem>>(this.url);
  }

  addIngredient(ingr: Ingredient): Observable<Ingredient>{
    return this.http.post<Ingredient>(this.url +'addIngredient', ingr);
  }

  httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  };

  updateIngredient(ingr: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(this.url +'updateIngredient', ingr, this.httpOptions);
  }
}