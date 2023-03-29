import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TagListItem } from "../models/shared/tagListItem.model";
import { TagSave } from "../models/shared/tagSave.model";


@Injectable()
export class TagService{
  private url = environment.mainUrl + 'api/tags/';

  constructor(private http: HttpClient){}

  getTags(): Observable<Array<TagSave>>{
    return this.http.get<Array<TagSave>>(this.url);
  }

  getTagsList(): Observable<Array<TagListItem>>{
    return this.http.get<Array<TagListItem>>(this.url+'names');
  }

  getItemTags(itemId: number, tableId: number): Observable<Array<TagListItem>>{
    return this.http.get<Array<TagListItem>>(this.url+itemId+'/'+tableId);
  }

  addTags(tags: TagSave[]): Observable<Array<TagSave>>{
    return this.http.post<Array<TagSave>>(this.url +'addTags', tags);
  }

  updateTags(tags: TagListItem[]): Observable<Array<TagListItem>>{
    return this.http.post<Array<TagListItem>>(this.url +'updateTags', tags);
  }

  deleteTags(tags: TagListItem[]): Observable<Array<TagListItem>>{
    return this.http.post<Array<TagListItem>>(this.url +'deleteTags', tags);
  }

  addTagName(tagListItem: TagListItem): Observable<TagListItem>{
    return this.http.post<TagListItem>(this.url +'addTagName', tagListItem);
  }

  updateTagName(tagListItem: TagListItem): Observable<TagListItem>{
    return this.http.post<TagListItem>(this.url +'updateTagName', tagListItem);
  }

  deleteTagName(tagListItem: TagListItem): Observable<TagListItem>{
    return this.http.post<TagListItem>(this.url +'deleteTagName', tagListItem);
  }




  
}