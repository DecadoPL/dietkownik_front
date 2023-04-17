export class Macronutrients{
  public kcal: string;
  public proteins: string;
  public carbohydrates: string;
  public fat: string;
  public fibers: string;
  public cholesterol: string;
  
 
  constructor(
    kcal?: string,
    proteins?: string,
    carbohydrates?: string,
    fat?: string,
    fibers?: string,
    cholesterol?: string,
  ){
    this.kcal = kcal ?? "0";
    this.proteins = proteins ?? "0";
    this.carbohydrates = carbohydrates ?? "0";
    this.fat = fat ?? "0";
    this.fibers = fibers ?? "0";
    this.cholesterol = cholesterol ?? "0"; 
  }

}