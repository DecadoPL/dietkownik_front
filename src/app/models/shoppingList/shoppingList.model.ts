import { ShoppingListItem } from "./shoppingListItem.model";

export class ShoppingList{
  public id: number;
  public name: string;
  public items: ShoppingListItem[];

  constructor(
    id: number,
    name: string,
    items: ShoppingListItem[]

  ){
    this.id = id;
    this.name = name;
    this.items = items;

  }
}