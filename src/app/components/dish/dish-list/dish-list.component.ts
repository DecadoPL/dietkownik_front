import { Component, OnInit } from '@angular/core';
import { DishListItem } from 'src/app/models/dish/dishListItem.model';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit{
  dishes!: DishListItem[]

  constructor(private dishService: DishService){}

  ngOnInit(){
    this.dishService.getDishesList().subscribe(
      (data) => {
        this.dishes = data;
      }
    );
  }

  deleteItem(id: number){
    if(confirm("Are you sure to delete?")) {
      this.dishService.deleteDish(id).subscribe(
        (data) =>{

          this.dishService.getDishesList().subscribe(
            (data) => {
              this.dishes = data;
            }
          );


        }
      );
    }
  }
}
