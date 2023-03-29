import { Dish } from "../dish/dish.model";
import { Macronutrients } from "../shared/macronutrients.model";
import { Micronutrients } from "../shared/micronutrients.model";
import { TagListItem } from "../shared/tagListItem.model";

export class DietDish{
  public id: number;
  public quantity: string;
  public time: string;
  public name: string;
  public macro: Macronutrients;
  public micro: Micronutrients;
  public dishId: number;
  public tags: TagListItem[];
  
  

  constructor( 
    id: number,
    quantity: string,
    time: string,
    name: string,
    macro: Macronutrients,
    micro: Micronutrients,
    dishId: number,
    tags: TagListItem[]  
  ){

    this.id = id;
    this.quantity = quantity;
    this.time = time;
    this.name = name;
    this.macro = macro;
    this.micro = micro;
    this.dishId = dishId;
    this.tags = tags;

  }
}