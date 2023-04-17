import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Diet } from 'src/app/models/diet/diet.model';
import { DietListItem } from 'src/app/models/diet/dietListItem.model';
import { DietService } from 'src/app/services/diet.service';

@Component({
  selector: 'app-diet-list',
  templateUrl: './diet-list.component.html',
  styleUrls: ['./diet-list.component.css']
})
export class DietListComponent implements OnInit{

  diets!: DietListItem[];

  constructor(private dietService: DietService,
              private router: Router){}
  
  ngOnInit(){
    this.dietService.getDietsList().subscribe(
      (data) => {
        this.diets = data;
      }
    );
  }

  deleteItem(id: number){
    if(confirm("Are you sure to delete?")) {
      this.dietService.deleteDiet(id).subscribe(
        (data) => {
          this.dietService.getDietsList().subscribe(
            (data) => {
              this.diets = data;
            }
          );
        }
      );
    }
  }

  copyItem(id: number){
    this.router.navigate(['diets/copy/'+id]);
  }

}
