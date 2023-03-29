import { Component, OnInit } from '@angular/core';
import { IngredientListItem } from 'src/app/models/ingredient/ingredientListItem.model';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit{
  $ingredients!: IngredientListItem[];

  constructor(private ingredientService: IngredientService){}

  ngOnInit(){
    this.ingredientService.getIngredientsList().subscribe(
      (data)=> {
        this.$ingredients = data;
    });
  }

  deleteItem(id: number){
    if(confirm("Are you sure to delete?")) {
      this.ingredientService.deleteIngredient(id).subscribe(
        (data) => {
  
          this.ingredientService.getIngredientsList().subscribe(
            (data)=> {
              this.$ingredients = data;
          });
  
  
  
        }
      );
    }
    

  }
}
