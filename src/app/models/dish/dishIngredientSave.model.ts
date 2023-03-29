export class DishIngredientSave{

  public id: number;
  public ingredientId: number;
  public dishId: number;
  public portionTypeId: number;
  public portionQuantity: string;

  constructor(
    id: number,
    ingredientId: number,
    dishId: number,
    portionTypeId: number,
    portionQuantity: string
  ){

    this.id = id;
    this.ingredientId = ingredientId;
    this.dishId = dishId;
    this.portionTypeId = portionTypeId;
    this.portionQuantity = portionQuantity;
  }
}