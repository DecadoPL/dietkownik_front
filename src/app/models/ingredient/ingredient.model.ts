import { Macronutrients } from "../shared/macronutrients.model";
import { Micronutrients } from "../shared/micronutrients.model";
import { TagListItem } from "../shared/tagListItem.model";
import { Portion } from "./portion.model";

export class Ingredient{

  public id: number;
  public name: string;
  public image: string;
  public brand: string;
  public ean: string;
  public description: string
  public macro: Macronutrients;
  public micro: Micronutrients;
  public tags: TagListItem[];
  public portions: Portion[];

  constructor(
    id?: number,
    name?: string,
    image?: string,
    brand?: string,
    ean?: string,
    description?: string,
    macro?: Macronutrients,
    micro?: Micronutrients, 
    tags?: TagListItem[],
    portions?: Portion[]
  ){

    this.id = id ?? 0;
    this.name = name ?? "";
    this.image = image ?? "";
    this.brand = brand ?? "";
    this.ean = ean ?? "";
    this.description = description ?? "";
    this.macro = macro ?? new Macronutrients();
    this.micro = micro ?? new Micronutrients();
    this.tags = tags ?? [];
    this.portions = portions ?? [];
    
  }

}