import { Macronutrients } from "../shared/macronutrients.model";
import { Micronutrients } from "../shared/micronutrients.model";
import { TagListItem } from "../shared/tagListItem.model";
import { PortionType } from "./portionType.model";

export class Ingredient{

  public id: number;
  public portionType: PortionType;
  public name: string;
  public image: string;
  public brand: string;
  public ean: string;
  public portionQuantity: string;
  public description: string
  public macro: Macronutrients;
  public micro: Micronutrients;
  public tags: TagListItem[];

  constructor(
    id?: number,
    portionType?: PortionType,
    name?: string,
    image?: string,
    brand?: string,
    ean?: string,
    portionQuantity?: string,
    description?: string,
    macro?: Macronutrients,
    micro?: Micronutrients, 
    tags?: TagListItem[]
  ){

    this.id = id ?? 0;
    this.portionType = portionType ?? new PortionType();
    this.name = name ?? "";
    this.image = image ?? "";
    this.brand = brand ?? "";
    this.ean = ean ?? "";
    this.portionQuantity = portionQuantity ?? "0";
    this.description = description ?? "";
    this.macro = macro ?? new Macronutrients();
    this.micro = micro ?? new Micronutrients();
    this.tags = tags ?? [];
    
  }

}