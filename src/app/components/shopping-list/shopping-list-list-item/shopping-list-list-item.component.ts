import { Component, Input } from '@angular/core';
import { ShoppingListListItem } from 'src/app/models/shoppingList/shoppingListListItem';

@Component({
  selector: 'app-shopping-list-list-item',
  templateUrl: './shopping-list-list-item.component.html',
  styleUrls: ['./shopping-list-list-item.component.css']
})
export class ShoppingListListItemComponent {

  @Input() shoppingList!: ShoppingListListItem;
  @Input() index!: number;
  
}
