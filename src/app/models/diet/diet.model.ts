import { DietDay } from "./dietDay.model";
import { DietRequirements } from "./dietRequirements.model";

export class Diet{
  public id: number;
  public name: string;
  public description: string;
  public requirements: DietRequirements;
  public days: DietDay[];
  
  constructor(
    id?: number,
    name?: string,
    description?: string,
    requirements?: DietRequirements,
    days?: DietDay[],
  ){
    this.id = id ?? 0;
    this.name = name ?? "";
    this.description = description ?? "";
    this.requirements = requirements ?? new DietRequirements();
    this.days = days ?? [];
  }
}