import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Observable, OperatorFunction, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { DietDish } from 'src/app/models/diet/dietDish.model';
import { Dish } from 'src/app/models/dish/dish.model';
import { DishListItem } from 'src/app/models/dish/dishListItem.model';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-diet-dishes-tray',
  templateUrl: './diet-dishes-tray.component.html',
  styleUrls: ['./diet-dishes-tray.component.css']
})
export class DietDishesTrayComponent implements OnInit, OnDestroy{

  @Input() unusedDishesPortions!: DietDish[];
  @Output() cancel = new EventEmitter<void>();
  @Output() dishSelected = new EventEmitter<DietDish>();
  bodyElement = document.body;

  newDish!: Dish;

  constructor(private dishService: DishService){}

  ngOnInit(){
    
    this.bodyElement.style.overflow = 'hidden';

    setTimeout(() => {
      const inputElement = document.getElementById('searchInput');
      if (inputElement) {
        inputElement.focus();
      }
    });

  }

  ngOnDestroy(){
    this.bodyElement.style.overflow = 'scroll';
  }

  onCancel(){
    this.cancel.emit();
  }

  formatter = (dish: DishListItem) => dish.name;

  search: OperatorFunction<string, readonly DishListItem[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter((term) => term.length >= 2),
    switchMap((term) => this.dishService.searchDishes(term))
  );

  addDish(){
    if(this.newDish != undefined){     
      this.dishService.getDish(this.newDish.id).subscribe(
        (dish) => {
          this.dishSelected.emit( new DietDish(0, "1/"+dish.portions,"00:00",dish.name,dish.macro,dish.micro,dish.id,dish.tags,));
          if(this.unusedDishesPortions.findIndex((unusedDish) => unusedDish.name == dish.name) == -1){
            if(dish.portions != "1"){
              this.unusedDishesPortions.push(new DietDish(0, +dish.portions-1+"/"+dish.portions,"00:00",dish.name,dish.macro,dish.micro,dish.id,dish.tags));
            }
          }      
        }
      )
      this.newDish = new Dish;
      
    }  
  }

  addDishFromUnused(dish: DietDish, index: number){
    var unusedDishIndex = this.unusedDishesPortions.findIndex((unusedDish) => unusedDish.name == dish.name);
    var dishTotalPortions = +this.unusedDishesPortions[unusedDishIndex].quantity.split("/")[1]
    var unusedDishQuantity = +this.unusedDishesPortions[unusedDishIndex].quantity.split("/")[0]
    this.unusedDishesPortions[unusedDishIndex].quantity = (unusedDishQuantity-1)+"/"+dishTotalPortions;
    if(unusedDishQuantity==1){
      this.unusedDishesPortions.splice(unusedDishIndex,1);
    }
    var dishToEmit = cloneDeep(dish);
    dishToEmit.quantity = (dishTotalPortions-unusedDishQuantity+1) +"/"+dishTotalPortions
    this.dishSelected.emit(cloneDeep(dishToEmit));
      
  }

}
