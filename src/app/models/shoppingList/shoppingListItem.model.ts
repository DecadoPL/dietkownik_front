export class ShoppingListItem{
  public name: string;
  public quantity: string;
  public portionName: string;
  public checked: boolean;

  constructor(
    name: string,
    quantity: string,
    portionName: string,
    checked: boolean,
  ){
    this.name = name;
    this.quantity = quantity;
    this.portionName = portionName;
    this.checked = checked;
  }
}