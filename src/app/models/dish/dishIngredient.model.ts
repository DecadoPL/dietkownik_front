import { Ingredient } from "../ingredient/ingredient.model";
import { Portion } from "../ingredient/portion.model";

export class DishIngredient{
  public id: number;
  public ingredient: Ingredient;
  public portion: Portion;
  public quantity: string;

  constructor(
    id: number,
    ingredient: Ingredient,
    portion: Portion,
    quantity: string,
  ){
    this.id = id;
    this.ingredient = ingredient;
    this.portion = portion;
    this.quantity = quantity;
  }
}