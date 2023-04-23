export class ShoppingListItem{
  public name: string;
  public quantity: string;
  public portionType: string;
  public checked: boolean;

  constructor(
    name: string,
    quantity: string,
    portionType: string,
    checked: boolean,
  ){
    this.name = name;
    this.quantity = quantity;
    this.portionType = portionType;
    this.checked = checked;
  }
}