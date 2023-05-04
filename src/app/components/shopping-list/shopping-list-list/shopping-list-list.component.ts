import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingListListItem } from 'src/app/models/shoppingList/shoppingListListItem';
import { ShoppingListService } from 'src/app/services/shoppingList.service';

@Component({
  selector: 'app-shopping-list-list',
  templateUrl: './shopping-list-list.component.html',
  styleUrls: ['./shopping-list-list.component.css']
})
export class ShoppingListListComponent {
  shoppingLists!: ShoppingListListItem[];

  constructor(private shoppingListService: ShoppingListService,
              private router: Router){}
  
  ngOnInit(){
    this.shoppingListService.getShoppingLists().subscribe(
      (data) => {
        this.shoppingLists = data;
      }
    );
  }

  deleteItem(id: number){
    if(confirm("Are you sure to delete?")) {
      this.shoppingListService.deleteShoppingList(id).subscribe(
        (data) => {
          this.shoppingListService.getShoppingLists().subscribe(
            (data) => {
              this.shoppingLists = data;
            }
          );
        }
      );
    }
  }

}
