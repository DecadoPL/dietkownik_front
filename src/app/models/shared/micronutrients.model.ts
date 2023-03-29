export class Micronutrients{
  public potassium: string;
  public sodium: string;
  public vitaminA: string;
  public vitaminC: string;
  public vitaminB6: string;
  public magnesium: string;
  public vitaminD: string;
  public vitaminB12: string;
  public calcium: string;
  public iron: string;

  constructor(
    potassium?: string,
    sodium?: string,
    vitaminA?: string,
    vitaminC?: string,
    vitaminB6?: string,
    magnesium?: string,
    vitaminD?: string,
    vitaminB12?: string,
    calcium?: string,
    iron?: string,
  ){
    this.potassium = potassium ?? "0";
    this.sodium = sodium ?? "0";
    this.vitaminA = vitaminA ?? "0";
    this.vitaminC = vitaminC ?? "0";
    this.vitaminB6 = vitaminB6 ?? "0";
    this.magnesium = magnesium ?? "0";
    this.vitaminD = vitaminD ?? "0";
    this.vitaminB12 = vitaminB12 ?? "0";
    this.calcium = calcium ?? "0";
    this.iron = iron ?? "0";
  }
}