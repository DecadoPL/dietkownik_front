import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DietListItem } from 'src/app/models/diet/dietListItem.model';
import { ShoppingListItem } from 'src/app/models/shoppingListItem.model';
import { DietService } from 'src/app/services/diet.service';
import { ShoppingListService } from 'src/app/services/shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ShoppingListGenerated: boolean = false;
  unchecked: ShoppingListItem[] = new Array();
  checked: ShoppingListItem[] = new Array();
  Diets!: DietListItem[];
  shoppingListForm!: FormGroup;

  constructor(private dietService: DietService,
              private shoppingListService: ShoppingListService,
              private fb: FormBuilder){}

  ngOnInit(){
    this.shoppingListForm = this.fb.group({
      diets: [[]],
      unchecked: [[]],
      checked: [this.fb.group({
        name:[],
        quantity:[],
        portionType:[]
      })],
    })

    this.dietService.getDietsList().subscribe(
      (dietsList) => {
        this.Diets = dietsList;
      }
    )

    this.shoppingListService.getShoppingList(0).subscribe(
      (shoppingList) => {
        shoppingList.forEach((item) => {
          if(item.checked){
            this.checked.push(item);
          }else{
            this.unchecked.push(item);
          }
        })

        console.log("getshoppingList this.checked", this.checked)
        console.log("getshoppingList this.unchecked", this.unchecked)
      }
    )
  }

  generateShoppingList(){
    this.ShoppingListGenerated = true;
    const selectedDiets = this.shoppingListForm.get('diets')?.value
    this.shoppingListService.GetShoppingListForDiets(selectedDiets).subscribe(
      (data) => {
        //this.unchecked = data;
        data.forEach((item, index) => {
          this.unchecked[index] = item;
        })
        let allShoppingListItems = this.unchecked.concat(this.checked);
        this.shoppingListService.saveShoppingList(allShoppingListItems).subscribe();
      }
    )
  }

  checkItem(item: ShoppingListItem){
    item.checked = true;
    this.checked.push(item);
    const itemIndex = this.unchecked.findIndex(x => x.name == item.name)
    this.unchecked.splice(itemIndex,1)

    console.log(this.checked)
    

    let allShoppingListItems = this.unchecked.concat(this.checked);
    this.shoppingListService.saveShoppingList(allShoppingListItems).subscribe();

  }

  uncheckItem(item: ShoppingListItem){
    item.checked=false;
    this.unchecked.push(item);
    const itemIndex = this.checked.findIndex(x => x.name == item.name)
    this.checked.splice(itemIndex,1)

    let allShoppingListItems = this.unchecked.concat(this.checked);
    this.shoppingListService.saveShoppingList(allShoppingListItems).subscribe();

  }

  newItem(event: any) {
    var value = event.target.value;
    this.unchecked.push(new ShoppingListItem(value,"1","pc", false))
    event.target.value = "";

    let allShoppingListItems = this.unchecked.concat(this.checked);
    this.shoppingListService.saveShoppingList(allShoppingListItems).subscribe();

  }

  uncheckedUpdate(event: any, itemId: number){
    var value = event.target.value;
    this.unchecked[itemId].quantity = value;

    let allShoppingListItems = this.unchecked.concat(this.checked);
    this.shoppingListService.saveShoppingList(allShoppingListItems).subscribe();

    event.target.value = "";
  }

}
