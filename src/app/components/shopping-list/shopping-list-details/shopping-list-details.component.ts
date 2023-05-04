import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { DietListItem } from 'src/app/models/diet/dietListItem.model';
import { ShoppingList } from 'src/app/models/shoppingList/shoppingList.model';
import { ShoppingListItem } from 'src/app/models/shoppingList/shoppingListItem.model';
import { DietService } from 'src/app/services/diet.service';
import { ShoppingListService } from 'src/app/services/shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list-details.component.html',
  styleUrls: ['./shopping-list-details.component.css']
})
export class ShoppingListDetailsComponent implements OnInit {

  shoppingList: ShoppingList = new ShoppingList(0,"bez_nazwy",[]);

  ShoppingListGenerated: boolean = false;
  unchecked: ShoppingListItem[] = new Array();
  checked: ShoppingListItem[] = new Array();
  Diets!: DietListItem[];
  shoppingListForm!: FormGroup;

  constructor(private dietService: DietService,
              private shoppingListService: ShoppingListService,
              private fb: FormBuilder,
              private route: ActivatedRoute){}

  ngOnInit(){
    this.shoppingListForm = this.fb.group({
      name: [this.shoppingList.name],
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

    this.route.params.subscribe(
      (params: Params) => {
        if(params['id']!=undefined && params['id']!= 'new'){

          this.shoppingListService.getShoppingList(params['id']).subscribe(
            (data) => {
              this.shoppingList = data;
              if(data.items != null) {
                data.items.forEach((item) => {
                  if(item.checked){
                    this.checked.push(item);
                  }else{
                    this.unchecked.push(item);
                  }
                })
              }

              this.shoppingListForm.patchValue({
                name: this.shoppingList.name
              })


      
              console.log("getshoppingList this.checked", this.checked)
              console.log("getshoppingList this.unchecked", this.unchecked)
            }
          )

        }
      }
    );

    this.shoppingListForm.get('name')?.valueChanges.subscribe(
      (value) => {
        if(value!=""){
          this.shoppingList.name = value;
          this.shoppingListService.saveShoppingList(this.shoppingList).subscribe();
        }else{
          this.shoppingList.name = "bez_nazwy"
          this.shoppingListService.saveShoppingList(this.shoppingList).subscribe();
        }
        
      }
    )
  }



  generateShoppingList(){
    this.ShoppingListGenerated = true;
    const selectedDiets = this.shoppingListForm.get('diets')?.value
    this.shoppingListService.getShoppingListForDiets(selectedDiets).subscribe(
      (data) => {
        this.unchecked = data;
        data.forEach((item, index) => {
          this.unchecked[index] = item;
        })
        console.log("this.shoppingList", this.shoppingList)
        this.shoppingList.items = this.unchecked.concat(this.checked);
        this.shoppingListService.saveShoppingList(this.shoppingList).subscribe();
      }
    )
  }

  checkItem(item: ShoppingListItem){
    item.checked = true;
    this.checked.push(item);
    const itemIndex = this.unchecked.findIndex(x => x.name == item.name)
    this.unchecked.splice(itemIndex,1)

    console.log(this.checked)
    

    this.shoppingList.items = this.unchecked.concat(this.checked);
    this.shoppingListService.saveShoppingList(this.shoppingList).subscribe();

  }

  uncheckItem(item: ShoppingListItem){
    item.checked=false;
    this.unchecked.push(item);
    const itemIndex = this.checked.findIndex(x => x.name == item.name)
    this.checked.splice(itemIndex,1)

    this.shoppingList.items = this.unchecked.concat(this.checked);
    this.shoppingListService.saveShoppingList(this.shoppingList).subscribe();

  }

  newItem(event: any) {
    var value = event.target.value;
    this.unchecked.push(new ShoppingListItem(value,"1","pc", false))
    event.target.value = "";

    this.shoppingList.items = this.unchecked.concat(this.checked);
    this.shoppingListService.saveShoppingList(this.shoppingList).subscribe();

  }

  uncheckedUpdate(event: any, itemId: number){
    var value = event.target.value;
    this.unchecked[itemId].quantity = value;

    this.shoppingList.items = this.unchecked.concat(this.checked);
    this.shoppingListService.saveShoppingList(this.shoppingList).subscribe();

    event.target.value = "";
  }

  deleteItem(item: ShoppingListItem){
    this.shoppingListService.deleteShoppingListItem(this.shoppingList.id,item).subscribe(
      (data) => {
        this.checked = [];
        this.unchecked = [];
        this.shoppingListService.getShoppingList(this.shoppingList.id).subscribe(
          (data) => {
            this.shoppingList = data;
            if(data.items != null) {
              data.items.forEach((item) => {
                if(item.checked){
                  this.checked.push(item);
                }else{
                  this.unchecked.push(item);
                }
              })
            }

    
            console.log("getshoppingList this.checked", this.checked)
            console.log("getshoppingList this.unchecked", this.unchecked)
          }
        )
      }
    )
  }

}
