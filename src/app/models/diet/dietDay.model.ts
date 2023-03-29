import { DietDish } from "./dietDish.model";

export class DietDay{
  public day: string;
  public date: string;
  public dishes: DietDish[];

  constructor(
    day?: string,
    date?: string,
    dishes?: DietDish[]
  ){
    this.day = day ?? "";
    this.date = date ?? "";
    this.dishes = dishes ?? [];

  }
}