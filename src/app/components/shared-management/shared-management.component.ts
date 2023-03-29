import { Component, OnInit } from '@angular/core';
import { PortionType } from 'src/app/models/ingredient/portionType.model';
import { TagListItem } from 'src/app/models/shared/tagListItem.model';
import { PortionTypeService } from 'src/app/services/portionType.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-shared-management',
  templateUrl: './shared-management.component.html',
  styleUrls: ['./shared-management.component.css']
})
export class SharedManagementComponent implements OnInit{

  allPortionTypes!: PortionType[];
  allTags!: TagListItem[];
  

  constructor(private portionTypeService: PortionTypeService,
              private tagService: TagService){}

  ngOnInit(){
    this.portionTypeService.getPortionTypes().subscribe(
      (data) => {
        this.allPortionTypes = data;
      }
    )

    this.tagService.getTagsList().subscribe(
      (data) => {
        this.allTags = data;
      }
    )
  }

  updatePortionType(event: any, pt: any) {
    const value = event.target.value;
    if(value != ""){      
      this.portionTypeService.updatePortionType(new PortionType(pt.id,value)).subscribe(
        (data) => {
          this.portionTypeService.getPortionTypes().subscribe(
            (data) => {
              this.allPortionTypes = data;
            }
          )
        }
      )
    }else{
      this.portionTypeService.deletePortionType(new PortionType(pt.id,value)).subscribe(
        (data) => {
          this.portionTypeService.getPortionTypes().subscribe(
            (data) => {
              this.allPortionTypes = data;
            }
          )
        }
      )
    }
  }

  newPortionType(event: any) {

    var value = event.target.value;
    
    this.portionTypeService.addPortionType(new PortionType(0,value)).subscribe(
      (data) => {
        this.portionTypeService.getPortionTypes().subscribe(
          (data) => {
            this.allPortionTypes = data;
          }
        )
      }
    )

    value.value = "";

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

    value.value = "";

  }


}
