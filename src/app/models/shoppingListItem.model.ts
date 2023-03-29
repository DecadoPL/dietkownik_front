export class ShoppingListItem{
  public ingredientName: string;
  public quantity: string;
  public portionType: string;

  constructor(
    ingredientName: string,
    quantity: string,
    portionType: string
  ){
    this.ingredientName = ingredientName;
    this.quantity = quantity;
    this.portionType = portionType
  }
}