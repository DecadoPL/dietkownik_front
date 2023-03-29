import { Macronutrients } from "../shared/macronutrients.model";
import { Micronutrients } from "../shared/micronutrients.model";
import { TagListItem } from "../shared/tagListItem.model";
import { DishIngredientSave } from "./dishIngredientSave.model";

export class DishDTO{
  public id: number;
  public name: string;
  public image: string;
  public portions: string;
  public description: string;
  public recipe: string;
  public cookingTime: string;
  public ingredients: DishIngredientSave[];
  public macro: Macronutrients;
  public micro: Micronutrients;
  public tags: TagListItem[];


  constructor(
    id: number,
    name: string,
    image: string, 
    portions: string,
    description: string,
    recipe: string,
    cookingTime: string,
    ingredients: DishIngredientSave[],
    macro: Macronutrients,
    micro: Micronutrients,
    tags: TagListItem[],

  ){
    this.id = id;
    this.name = name;
    this.image = image;
    this.portions = portions;
    this.description = description;
    this.recipe = recipe;
    this.cookingTime = cookingTime;
    this.ingredients = ingredients;
    this.macro = macro,
    this.micro = micro,
    this.tags = tags;

  }
}