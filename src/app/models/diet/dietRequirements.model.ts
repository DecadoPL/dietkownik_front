import { IngredientListItem } from "../ingredient/ingredientListItem.model";
import { Macronutrients } from "../shared/macronutrients.model";
import { Micronutrients } from "../shared/micronutrients.model";
import { TagListItem } from "../shared/tagListItem.model";

export class DietRequirements{
  public id: number;
  public name: string;
  public description: string;
  public macro: Macronutrients;
  public micro: Micronutrients;
  public requiredTags: TagListItem[];
  public prohibitedTags: TagListItem[];
  public requiredIngredients: IngredientListItem[];
  public prohibitedIngredients: IngredientListItem[];

  constructor(
    id?: number,
    name?: string,
    description?: string,
    macro?: Macronutrients,
    micro?: Micronutrients,
    requiredTags?: TagListItem[],
    prohibitedTags?: TagListItem[],
    requiredIngredients?: IngredientListItem[],
    prohibitedIngredients?: IngredientListItem[],
  ){
    this.id = id ?? 0;
    this.name = name ?? "";
    this.description = description ?? "";
    this.macro = macro ?? new Macronutrients();
    this.micro = micro ?? new Micronutrients();
    this.requiredTags = requiredTags ?? [];
    this.prohibitedTags = prohibitedTags ?? [];
    this.requiredIngredients = requiredIngredients ?? [];
    this.prohibitedIngredients = prohibitedIngredients ?? [];
  }
}

