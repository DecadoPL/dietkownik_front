import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PortionType } from "../models/ingredient/portionType.model";
import { Ingredient } from "../models/ingredient/ingredient.model";
import { environment } from "src/environments/environment";

@Injectable()
export class PortionTypeService{
  url = environment.mainUrl + 'api/PortionTypes/';

  constructor(private http: HttpClient){}

  getPortionTypes(): Observable<Array<PortionType>>{
    return this.http.get<Array<PortionType>>(this.url);
  }

  addPortionType(portionType: PortionType): Observable<PortionType>{
    return this.http.post<PortionType>(this.url +'addPortionType', portionType);
  }

  updatePortionType(portionType: PortionType): Observable<PortionType>{
    return this.http.post<PortionType>(this.url +'updatePortionType', portionType);
  }

  deletePortionType(portionType: PortionType): Observable<PortionType>{
    return this.http.post<PortionType>(this.url +'deletePortionType', portionType);
  }
}