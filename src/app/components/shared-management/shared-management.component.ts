import { Component, OnInit } from '@angular/core';
import { PortionName } from 'src/app/models/ingredient/PortionName.model';
import { TagListItem } from 'src/app/models/shared/tagListItem.model';
import { PortionNameService } from 'src/app/services/PortionName.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-shared-management',
  templateUrl: './shared-management.component.html',
  styleUrls: ['./shared-management.component.css']
})
export class SharedManagementComponent implements OnInit{

  allPortionNames!: PortionName[];
  allTags!: TagListItem[];
  

  constructor(private PortionNameService: PortionNameService,
              private tagService: TagService){}

  ngOnInit(){
    this.PortionNameService.getPortionNames().subscribe(
      (data) => {
        this.allPortionNames = data;
      }
    )

    this.tagService.getTagsList().subscribe(
      (data) => {
        this.allTags = data;
      }
    )
  }

  updatePortionName(event: any, pt: any) {
    const value = event.target.value;
    if(value != ""){      
      this.PortionNameService.updatePortionName(new PortionName(pt.id,value)).subscribe(
        (data) => {
          this.PortionNameService.getPortionNames().subscribe(
            (data) => {
              this.allPortionNames = data;
            }
          )
        }
      )
    }else{
      this.PortionNameService.deletePortionName(new PortionName(pt.id,value)).subscribe(
        (data) => {
          this.PortionNameService.getPortionNames().subscribe(
            (data) => {
              this.allPortionNames = data;
            }
          )
        }
      )
    }
  }

  newPortionName(event: any) {

    var value = event.target.value;
    
    this.PortionNameService.addPortionName(new PortionName(0,value)).subscribe(
      (data) => {
        this.PortionNameService.getPortionNames().subscribe(
          (data) => {
            this.allPortionNames = data;
          }
        )
      }
    )

    event.target.value = "";

  }

  updateTagName(event: any, tn: any) {
    const value = event.target.value;
    if(value != ""){      
      this.tagService.updateTagName(new TagListItem(tn.id,value)).subscribe(
        (data) => {
          this.tagService.getTagsList().subscribe(
            (data) => {
              this.allTags = data;
            }
          )
        }
      )
    }else{
      this.tagService.deleteTagName(new TagListItem(tn.id,value)).subscribe(
        (data) => {
          this.tagService.getTagsList().subscribe(
            (data) => {
              this.allTags = data;
            }
          )
        }
      )
    }
  }

  newTagName(event: any) {

    var value = event.target.value;
    
    this.tagService.addTagName(new TagListItem(0,value)).subscribe(
      (data) => {
        this.tagService.getTagsList().subscribe(
          (data) => {
            this.allTags = data;
          }
        )
      }
    )

    event.target.value = "";

  }


}
