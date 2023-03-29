import { Component, OnInit } from '@angular/core';
import { DietRequirementsListItem } from 'src/app/models/diet/dietRequirementsListItem.model';
import { DietRequirementsService } from 'src/app/services/dietRequirements.service';

@Component({
  selector: 'app-diet-requirements-list',
  templateUrl: './diet-requirements-list.component.html',
  styleUrls: ['./diet-requirements-list.component.css']
})
export class DietRequirementsListComponent implements OnInit {
  $dietRequirementsList!: DietRequirementsListItem[];

  constructor(private dietRequirementsService: DietRequirementsService){}

  ngOnInit(){
    this.dietRequirementsService.getDietRequirementsList().subscribe(
      (data)=> {
        this.$dietRequirementsList = data;
    });

  }

  deleteItem(id: number){
    if(confirm("Are you sure to delete?")) {
      this.dietRequirementsService.deleteDietRequirements(id).subscribe(
        (data) => {

          this.dietRequirementsService.getDietRequirementsList().subscribe(
            (data)=> {
              this.$dietRequirementsList = data;
          });


        }
      );
    }
  }
}
