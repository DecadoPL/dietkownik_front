import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { ShoppingListItem } from 'src/app/models/shoppingListItem.model';

const now = new Date();

@Component({
  selector: 'app-diet-details',
  templateUrl: './diet-details.component.html',
  styleUrls: ['./diet-details.component.css']
})
export class DietDetailsComponent implements OnInit, IDeactivateComponent{



  model!: NgbDateStruct;
  diet: Diet = new Diet();
  newDish!: Dish;
  dietForm!: FormGroup;
  shoppingList: ShoppingListItem[] = new Array();
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
              this.requireSave = false;
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

    if(this.diet.id != 0){
      this.dietService.updateDiet(this.diet).subscribe();
    }else{
      this.dietService.addDiet(this.diet).subscribe();
    } 
    this.requireSave = false;
  }

  deleteDish(data: [number, number]){
    this.diet.days[data[1]].dishes.splice(data[0],1);
    this.updateDailyMacro();
    this.requireSave = true;
  }

  addDish(dayNumber: number){

    if(this.newDish != undefined){
      

      this.dishService.getDish(this.newDish.id).subscribe(
        (data) => {
          this.diet.days[dayNumber].dishes.push(new DietDish(0,"1","00:00",data.name,data.macro,data.micro,data.id,data.tags));
          this.updateDailyMacro();
          this.requireSave = true;


        }
      )

      this.newDish = new Dish;

      for(var i = 0; i< 7; i++){
        const input = document.getElementById('dishSearchInput'+i) as HTMLInputElement;
        if (input) {
          input.value = '';
        }
      }

    }
  }

  updateDailyMacro(){
    var precision: number = 1;

    this.clearDailyMacro();

    this.diet.days.forEach(
      (value, index) => {
        if(value.dishes != undefined){     
          value.dishes.forEach(
            (value) => {
              if(value.dishId != undefined){
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

  generateShoppingList(){
    this.shoppingListGenerated = true;

    this.dietService.getDietShoppingList(this.diet.id).subscribe(
      (data) => {
        this.shoppingList = data;
      }
    )
    
  }
}














