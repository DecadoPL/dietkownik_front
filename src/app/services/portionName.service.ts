import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PortionName } from "../models/ingredient/PortionName.model";

@Injectable()
export class PortionNameService{
  url = environment.mainUrl + 'api/PortionNames/';

  constructor(private http: HttpClient){}

  getPortionNames(): Observable<Array<PortionName>>{
    return this.http.get<Array<PortionName>>(this.url);
  }

  addPortionName(portionName: PortionName): Observable<PortionName>{
    return this.http.post<PortionName>(this.url +'addPortionName', portionName);
  }

  updatePortionName(portionName: PortionName): Observable<PortionName>{
    return this.http.post<PortionName>(this.url +'updatePortionName', portionName);
  }

  deletePortionName(portionName: PortionName): Observable<PortionName>{
    return this.http.post<PortionName>(this.url +'deletePortionName', portionName);
  }
}