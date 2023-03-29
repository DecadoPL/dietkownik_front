import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DietRequirements } from "../models/diet/dietRequirements.model";
import { DietRequirementsListItem } from "../models/diet/dietRequirementsListItem.model";

@Injectable()
export class DietRequirementsService{
  private url = environment.mainUrl + 'api/dietrequirements/';

  constructor(private http: HttpClient){}

  getDietRequirementsList(): Observable<Array<DietRequirementsListItem>>{
    return this.http.get<Array<DietRequirementsListItem>>(this.url);
  }
  
  getDietRequirements(id: number): Observable<DietRequirements>{
    return this.http.get<DietRequirements>(this.url+id);
  }

  addDietRequirements(dr: DietRequirementsListItem): Observable<DietRequirementsListItem>{
    return this.http.post<DietRequirementsListItem>(this.url+"addDietRequirements", dr);
  }

  updateDietRequirements(dr: DietRequirementsListItem): Observable<DietRequirementsListItem>{
    return this.http.post<DietRequirementsListItem>(this.url+"updateDietRequirements", dr);
  }

  searchDietRequirements(searchName: string): Observable<Array<DietRequirementsListItem>>{
    return this.http.get<Array<DietRequirementsListItem>>(this.url+searchName);
  }

  deleteDietRequirements(id: number): Observable<any>{
    return this.http.delete(this.url+"deleteDietRequirements/"+id);
  }
}