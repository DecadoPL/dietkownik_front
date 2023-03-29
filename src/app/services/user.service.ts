import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/user/user.model";

@Injectable()
export class UserService{
  private url = environment.mainUrl + 'api/users/';

  constructor(private http: HttpClient){}

  getUser(id:number): Observable<User>{
    return this.http.get<User>(this.url+id);
  }
}