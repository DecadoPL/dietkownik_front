export class DishIngredientSave{

  public id: number;
  public ingredientId: number;
  public dishId: number;
  public portionNameId: number;
  public quantity: string;

  constructor(
    id: number,
    ingredientId: number,
    dishId: number,
    portionNameId: number,
    quantity: string
  ){

    this.id = id;
    this.ingredientId = ingredientId;
    this.dishId = dishId;
    this.portionNameId = portionNameId;
    this.quantity = quantity;
  }
}