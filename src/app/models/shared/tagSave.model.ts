export class TagSave{
  public nameId: number;
  public tableId: number;
  public itemId: number;

  constructor( 
    nameId: number,
    tableId: number,
    itemId: number
  ){
    this.nameId = nameId;
    this.tableId = tableId;
    this.itemId = itemId
  }
}