export class Portion{
  public id: number;
  public name: string;
  public quantity: string;

  constructor( 
    id?: number,
    name?: string,
    quantity?: string,
  ){
    this.id = id ?? 0;
    this.name = name ?? "";
    this.quantity = quantity ?? "";
  }
}