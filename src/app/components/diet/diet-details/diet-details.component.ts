import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild,} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, Observable, OperatorFunction, switchMap } from 'rxjs';
import { Diet } from 'src/app/models/diet/diet.model';
import { DietDay } from 'src/app/models/diet/dietDay.model';
import { DietDish } from 'src/app/models/diet/dietDish.model';
import { DietRequirements } from 'src/app/models/diet/dietRequirements.model';
import { DietRequirementsListItem } from 'src/app/models/diet/dietRequirementsListItem.model';

import { Dish } from 'src/app/models/dish/dish.model';
import { DishListItem } from 'src/app/models/dish/dishListItem.model';
import { IDeactivateComponent } from 'src/app/services/can-deactivate-guard.service';
import { DietService } from 'src/app/services/diet.service';
import { DishService } from 'src/app/services/dish.service';
import { DietRequirementsService } from 'src/app/services/dietRequirements.service';
import { ShoppingListItem } from 'src/app/models/shoppingList/shoppingListItem.model';
import { CdkDragDrop} from '@angular/cdk/drag-drop';
import { cloneDeep } from 'lodash';

const now = new Date();

@Component({
  selector: 'app-diet-details',
  templateUrl: './diet-details.component.html',
  styleUrls: ['./diet-details.component.css']
})

export class DietDetailsComponent implements OnInit, IDeactivateComponent{

  unusedDishesPortions: DietDish[] = new Array();
  model!: NgbDateStruct;
  diet: Diet = new Diet();
  newDish!: Dish;
  dietForm!: FormGroup;
  shoppingList: ShoppingListItem[] = new Array();
  showInputs: { [key: string]: boolean } = {};
  isFormValid: boolean = false;
  requireSave: boolean = false;
  alertMsg!: string;
  alert: boolean = false;
  shoppingListGenerated: boolean = false;
  inDay: DietRequirements[] =  new Array(
    new DietRequirements(),
    new DietRequirements(),
    new DietRequirements(),
    new DietRequirements(),
    new DietRequirements(),
    new DietRequirements(),
    new DietRequirements()
  )
  difference: DietRequirements[] =  new Array(
    new DietRequirements(),
    new DietRequirements(),
    new DietRequirements(),
    new DietRequirements(),
    new DietRequirements(),
    new DietRequirements(),
    new DietRequirements()
  )
  allRequirements: DietRequirementsListItem[] = new Array();

  constructor(private route: ActivatedRoute,
              private dishService: DishService,
              private dietService: DietService,
              private datePipe: DatePipe,
              private fb:FormBuilder,
              private dietRequirementsService: DietRequirementsService){}

  @ViewChild('dishInput') dishInput!: ElementRef;

  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }
  
  ngOnInit(){
    this.dietForm = this.fb.group({
      name: [this.diet.name],
      description: [this.diet.description],
      requirements: [[],Validators.required]
    })

    this.route.params.subscribe(
      (params: Params) => {
        if(params['dietId']!=undefined){
          this.dietService.getDiet(+params['dietId']).subscribe(
            (data) => {
              
              this.diet = data;   
              var hoursChangedFlag = false;

              this.diet.days.forEach(
                (day, dayIndex) => {
                  var temp_dayDishesArr: DietDish[] = new Array();
                  day.dishes.forEach(
                    (dish) => {
                      var dishTotalPortions = dish.quantity.split("/")[1]
                      if(+dishTotalPortions > 1){

                        //jeżeli dania nie ma na liście unused to dodaj
                         if(this.unusedDishesPortions.findIndex((unusedDish) => unusedDish.name == dish.name) == -1){
                            this.unusedDishesPortions.push(new DietDish(0, +dishTotalPortions-1+"/"+dishTotalPortions,"00:00",dish.name,dish.macro,dish.micro,dish.dishId,dish.tags));
                          //jeżeli jest to zdejmij z listy unused
                          }else{
                            var unusedDishIndex = this.unusedDishesPortions.findIndex((unusedDish) => unusedDish.name == dish.name);
                            var unusedDishQuantity = +this.unusedDishesPortions[unusedDishIndex].quantity.split("/")[0]
                            this.unusedDishesPortions[unusedDishIndex].quantity = (unusedDishQuantity-1)+"/"+dishTotalPortions;
                            if(unusedDishQuantity==1){
                              this.unusedDishesPortions.splice(unusedDishIndex,1);
                            }
                          }
                      }
                      const hourIndex = this.diet.requirements.hours.findIndex((hour) => hour === dish.time)
                      if(hourIndex != -1){// godzina znaleziona
                        temp_dayDishesArr[hourIndex] = dish;
                      }else{
                        hoursChangedFlag = true;
                        //jeżeli danie jest na liście unused
                        var unusedDishIndex = this.unusedDishesPortions.findIndex((unusedDish) => unusedDish.name == dish.name);
                        var unusedDishQuantity = +this.unusedDishesPortions[unusedDishIndex].quantity.split("/")[0]
                        
                        if(unusedDishIndex != -1){//danie znalezione
                          this.unusedDishesPortions[unusedDishIndex].quantity = (unusedDishQuantity+1)+"/"+dishTotalPortions;
                        }else{
                          this.unusedDishesPortions.push(dish);
                        }

                      }
                    }
                  )             
                  this.diet.days[dayIndex].dishes = temp_dayDishesArr;
                }
              )  

              if(hoursChangedFlag){
                confirm("Hours has changed")
              }
             
              if(this.diet.requirements==null){
                if(confirm("Diet requirements has been deleted. Select new")) {
                  this.diet.requirements= new DietRequirements()
                }
              }

              this.dietForm.patchValue({
                name: this.diet.name,
                description: this.diet.description,
                requirements: this.diet.requirements.name
              })
              this.updateDailyMacro();
              if(this.route.snapshot.routeConfig?.path?.includes("copy")){
                this.requireSave = true;
                this.diet.id = 0;
              }else{
                this.requireSave = false;
              }
              
            }
          );

        }else{
          var days: DietDay[] = [
            new DietDay(),
            new DietDay(),
            new DietDay(),
            new DietDay(),
            new DietDay(),
            new DietDay(),
            new DietDay()
          ]  
          this.diet.days = days;
          this.selectToday();
          this.dateSelected();
        }
        
      }
    )
    this.updateDailyMacro();

    this.dietRequirementsService.getDietRequirementsList().subscribe(
      (data) => {
        this.allRequirements = data;

        this.dietForm.get('requirements')?.valueChanges.subscribe(
          (value) => {
            this.diet.requirements.id = this.allRequirements.find(x=>x.name == value)!.id;
            
            this.updateDailyMacro();
          }
        );

      }
    )

    this.dietForm.statusChanges.subscribe(
      (status) =>{
        if(status=="VALID"){
          this.isFormValid = true;
        }else{
          this.isFormValid = false;
        }
        this.requireSave = true;
      }
    )

  }


  drop(event: CdkDragDrop<DietDish[]>, dish: DietDish) {
    var currentDay = +event.container.id.split("-")[0];
    var currentSlot = +event.container.id.split("-")[1];
    var previousDay = +event.previousContainer.id.split("-")[0];
    var previousSlot = +event.previousContainer.id.split("-")[1];

    if (event.previousContainer != event.container) {
      var currentSlotDish = this.diet.days[currentDay].dishes[currentSlot];
      if(currentSlotDish === null ||  currentSlotDish === undefined){
        this.diet.days[currentDay].dishes[currentSlot] = this.diet.days[previousDay].dishes[previousSlot]; 
        this.diet.days[currentDay].dishes[currentSlot].time = this.diet.requirements.hours[currentSlot];
        this.diet.days[previousDay].dishes = this.removeAndInsertEmpty(this.diet.days[previousDay].dishes,previousSlot)
        this.updateDailyMacro();
        this.requireSave = true;
      }
    }

  }

  removeAndInsertEmpty(arr: any[], index: number): any[] {
    const newArr = arr.slice(); 
    newArr.splice(index, 1, null);
    return newArr;
  }

  dateSelected() {
    const daysInMonth = new Date(this.model.year, this.model.month, 0).getDate();
    const daysInSelectedMonth = daysInMonth - this.model.day + 1;

    var newMonthFlag = false;
    var newYearFlag = false;
  
    const days = Array(7).fill(null).map((_value, index) => {
      const day = index < daysInSelectedMonth ? this.model.day + index : index - daysInSelectedMonth + 1;
      var month: number = this.model.month;
      if(newMonthFlag==true){
        if(month < 12){
          month = this.model.month + 1;
        }else{
          month = 1;
        }       
      }else{
        month = this.model.month;
      }
      var year: number = this.model.year;
      if(newYearFlag==true){
        year = this.model.year + 1;
      }else{
        year = this.model.year;
      }

      const dayName = this.datePipe.transform(new Date(year, month - 1, day), 'EEEE');
      const data = `${day}.${month}.${year}`;

      if(day == daysInMonth){
        newMonthFlag = true;
        if(month == 12){
          newYearFlag = true;
        }
      } 


      return new DietDay(dayName!, data, []);
      
    });
  
    this.diet.days = days.slice(0, 7);
    
  }

  formatter = (dish: DishListItem) => dish.name;

  search: OperatorFunction<string, readonly DishListItem[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter((term) => term.length >= 2),
    switchMap((term) => this.dishService.searchDishes(term))
  );

  canExit(): Promise<boolean> {
    if (this.requireSave == false) {
      return Promise.resolve(true);
    } else {
      this.alertMsg = "Save changes or die try'n";
      this.alert = true;
      return new Promise<boolean>((resolve, reject) => {
        this.alertSave = () => {
          this.alert = false;
          this.onSubmit();
          resolve(true);
        };
        this.alertCancel = () => {
          this.alert = false;
          resolve(false);
        };
        this.alertDiscard = () => {
          this.alert = false;
          resolve(true);
        };
      });
    }
  }

  alertCancel(){}

  alertSave(){}

  alertDiscard(){}

  calculateKcal(){
    const precision = 1;
    this.diet.requirements.macro.kcal = ((+this.diet.requirements.macro.proteins!*4)+(+this.diet.requirements.macro.carbohydrates!*4)+(+this.diet.requirements.macro.fat!*9)).toFixed(precision).toString();
    this.dietForm.patchValue({
      kcal: this.diet.requirements.macro.kcal
    })
  }

  onSubmit(){
    this.diet.name = this.dietForm.get('name')?.value;
    this.diet.description = this.dietForm.get('description')?.value;

    const copiedDiet = cloneDeep(this.diet);
    
    copiedDiet.days.forEach(
      (day) => {
        day.dishes.forEach(
          () => {  
            day.dishes = day.dishes.filter((elem) => elem !== null && elem !== undefined);       
          }
        )
      }
    )  
  
    if(this.diet.id != 0){
      this.dietService.updateDiet(copiedDiet).subscribe();
    }else{
      this.dietService.addDiet(copiedDiet).subscribe();
    } 
    this.requireSave = false;
  }

  deleteDish(data: [number, number]){

    var tempDish = this.diet.days[data[1]].dishes[data[0]];
    if(this.diet.days[data[1]].dishes[data[0]].quantity != "1/1"){
     
      tempDish.time="00:00"
      var dishTotalPortions = tempDish.quantity.split("/")[1];
      tempDish.quantity = "1/"+dishTotalPortions

      let unusedDishIndex = this.unusedDishesPortions.findIndex(x=>x.name == tempDish.name)

      if(unusedDishIndex != -1){//znaleziono
        var portions = this.unusedDishesPortions[unusedDishIndex].quantity.split("/")[0];
        this.unusedDishesPortions[unusedDishIndex].quantity = +portions+1+"/"+dishTotalPortions;
      }else{
        this.unusedDishesPortions.push(tempDish);
      }
         
    }
    this.diet.days[data[1]].dishes = this.removeAndInsertEmpty(this.diet.days[data[1]].dishes, data[0])
    this.renumberPortions(tempDish);
    this.updateDailyMacro();
    this.requireSave = true;
  }

  addDish(dayNumber: number, dishIndex: number, dish: DietDish){
    dish.time = this.diet.requirements.hours[dishIndex];
    this.diet.days[dayNumber].dishes[dishIndex] = dish
    this.updateDailyMacro();
    this.requireSave = true;
    this.renumberPortions(dish);
  }

  renumberPortions(dish: DietDish){
    var dishTotalPortions = dish.quantity.split("/")[1];
    var dishCurrentPortion = 1;
    this.diet.days.forEach(
      (day)=>{
        var tempDishes = day.dishes.filter(dayDish => {
          if(dayDish && dayDish.dishId == dish.dishId){
            return true;
          }else{
            return false;
          }
        })
        tempDishes.forEach(
          (dish) => {
            dish.quantity = dishCurrentPortion+"/"+dishTotalPortions;
            dishCurrentPortion++;
            if(dishCurrentPortion > +dishTotalPortions) dishCurrentPortion = 1;
          }
        )
      }
    )
  }

  updateDailyMacro(){
    var precision: number = 1;

    this.clearDailyMacro();

    this.diet.days.forEach(
      (value, index) => {
        if(value.dishes != undefined){     
          value.dishes.forEach(
            (value) => {
              if(value != undefined || value != null ){
                this.inDay[index].macro.proteins = (+this.inDay[index].macro.proteins! + (+value.macro.proteins!)).toFixed(precision).toString();
                this.inDay[index].macro.carbohydrates = (+this.inDay[index].macro.carbohydrates! + (+value.macro.carbohydrates!)).toFixed(precision).toString();
                this.inDay[index].macro.fat = (+this.inDay[index].macro.fat! + (+value.macro.fat!)).toFixed(precision).toString();
                this.inDay[index].macro.kcal = (+this.inDay[index].macro.kcal! + (+value.macro.kcal!)).toFixed(precision).toString();
              }
            }
          )    
          this.difference[index].macro.proteins = (+this.diet.requirements.macro.proteins! - (+this.inDay[index].macro.proteins!)).toFixed(precision).toString();
          this.difference[index].macro.carbohydrates = (+this.diet.requirements.macro.carbohydrates! - (+this.inDay[index].macro.carbohydrates!)).toFixed(precision).toString();
          this.difference[index].macro.fat = (+this.diet.requirements.macro.fat! - (+this.inDay[index].macro.fat!)).toFixed(precision).toString();
          this.difference[index].macro.kcal = (+this.diet.requirements.macro.kcal! - (+this.inDay[index].macro.kcal!)).toFixed(precision).toString();
        } 
      }
    )
  };
  

  clearDailyMacro(){
    this.inDay = new Array(
      new DietRequirements(),
      new DietRequirements(),
      new DietRequirements(),
      new DietRequirements(),
      new DietRequirements(),
      new DietRequirements(),
      new DietRequirements()
    )
  
    this.difference = new Array(
      new DietRequirements(),
      new DietRequirements(),
      new DietRequirements(),
      new DietRequirements(),
      new DietRequirements(),
      new DietRequirements(),
      new DietRequirements()
    )
  }


}