import { Ingredient } from "../ingredient/ingredient.model";
import { PortionType } from "../ingredient/portionType.model";

export class DishIngredient{
  public id: number;
  public ingredient: Ingredient;
  public portionQuantity: string;
  public portionType: PortionType;

  constructor(
    id: number,
    ingredient: Ingredient,
    portionQuantity: string,
    portionType: PortionType
  ){
    this.id = id;
    this.ingredient = ingredient;
    this.portionQuantity = portionQuantity;
    this.portionType = portionType;
  }
}