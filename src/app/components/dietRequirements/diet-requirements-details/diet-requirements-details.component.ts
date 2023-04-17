import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { DietDay } from 'src/app/models/diet/dietDay.model';
import { DietRequirements } from 'src/app/models/diet/dietRequirements.model';
import { IngredientListItem } from 'src/app/models/ingredient/ingredientListItem.model';
import { Macronutrients } from 'src/app/models/shared/macronutrients.model';
import { Micronutrients } from 'src/app/models/shared/micronutrients.model';
import { TagListItem } from 'src/app/models/shared/tagListItem.model';
import { DietRequirementsService } from 'src/app/services/dietRequirements.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-diet-requirements-details',
  templateUrl: './diet-requirements-details.component.html',
  styleUrls: ['./diet-requirements-details.component.css']
})
export class DietRequirementsDetailsComponent implements OnInit {

  dietRequirements: DietRequirements = new DietRequirements();
  isFormValid!: boolean;
  requireSave: boolean = false;
  alertMsg!: string;
  alert: boolean = false;
  dietRequirementsForm!: FormGroup;
  allTags!: TagListItem[];
  allIngredients!: IngredientListItem[];
  hours!: string[];

  constructor(private dietRequirementsService: DietRequirementsService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private tagsService: TagService,
              private ingredientsService: IngredientService){}

  ngOnInit(){

    this.dietRequirementsForm = this.fb.group({
      id: this.dietRequirements.id,
      name: [this.dietRequirements.name, Validators.required],
      description: [this.dietRequirements.description],

      macro: this.fb.group({
        proteins: [this.dietRequirements.macro.proteins, [Validators.required, Validators.min(0), Validators.max(1000)]],
        carbohydrates: [this.dietRequirements.macro.carbohydrates, [Validators.required, Validators.min(0), Validators.max(1000)]],
        fat: [this.dietRequirements.macro.fat, [Validators.required, Validators.min(0), Validators.max(1000)]],
        kcal: [this.dietRequirements.macro.kcal],
        fibers: [this.dietRequirements.macro.fibers, [Validators.min(0), Validators.max(1000)]],
        cholesterol: [this.dietRequirements.macro.cholesterol, [Validators.min(0), Validators.max(1000)]]
      }),

      micro: this.fb.group({
        potassium: [this.dietRequirements.micro.potassium, [Validators.min(0), Validators.max(1000)]],
        sodium: [this.dietRequirements.micro.sodium, [Validators.min(0), Validators.max(1000)]],
        vitaminA: [this.dietRequirements.micro.vitaminA, [Validators.min(0), Validators.max(1000)]],
        vitaminC: [this.dietRequirements.micro.vitaminC, [Validators.min(0), Validators.max(1000)]],
        vitaminB6: [this.dietRequirements.micro.vitaminB6, [Validators.min(0), Validators.max(1000)]],
        magnesium: [this.dietRequirements.micro.magnesium, [Validators.min(0), Validators.max(1000)]],
        vitaminD: [this.dietRequirements.micro.vitaminD, [Validators.min(0), Validators.max(1000)]],
        vitaminB12: [this.dietRequirements.micro.vitaminB12, [Validators.min(0), Validators.max(1000)]],
        calcium: [this.dietRequirements.micro.calcium, [Validators.min(0), Validators.max(1000)]],
        iron: [this.dietRequirements.micro.iron, [Validators.min(0), Validators.max(1000)]]
      }), 

      requiredTags:[],
      prohibitedTags:[],
      requiredIngredients:[],
      prohibitedIngredients:[], 
      hours: [],
    });

    this.tagsService.getTagsList().subscribe(
      (data) => {
        this.allTags = data;
      }
    )

    this.ingredientsService.getIngredientsList().subscribe(
      (data) => {
        this.allIngredients = data;
      }
    )

    this.route.params.subscribe(
      (params: Params) => {
        if(params['id']!=undefined){
          this.dietRequirementsService.getDietRequirements(+params['id']).subscribe(
            (data) => {
              this.dietRequirements = data;
              
              this.dietRequirementsForm.patchValue({
                id: this.dietRequirements.id,
                name: this.dietRequirements.name,
                description: this.dietRequirements.description,
                macro: this.dietRequirements.macro,       
                micro: this.dietRequirements.micro,         
                requiredTags: this.dietRequirements.requiredTags,
                prohibitedTags: this.dietRequirements.prohibitedTags,
                requiredIngredients: this.dietRequirements.requiredIngredients,
                prohibitedIngredients: this.dietRequirements.prohibitedIngredients, 
                hours: this.dietRequirements.hours
              });
              if( this.dietRequirements.requiredTags != null){
                var tempArr: string[] = [];
                this.dietRequirements.requiredTags.forEach(
                  (value) => {
                    tempArr.push(value.name);
                  })

                this.dietRequirementsForm.get('requiredTags')?.setValue(tempArr);
              }
              if( this.dietRequirements.prohibitedTags != null){
                tempArr = [];
                this.dietRequirements.prohibitedTags.forEach(
                  (value) => {
                    tempArr.push(value.name);
                  })

                this.dietRequirementsForm.get('prohibitedTags')?.setValue(tempArr);
              }
              if( this.dietRequirements.requiredIngredients != null){
                tempArr = [];
                this.dietRequirements.requiredIngredients.forEach(
                  (value) => {
                    tempArr.push(value.name);
                  })

                this.dietRequirementsForm.get('requiredIngredients')?.setValue(tempArr);
              }
              if( this.dietRequirements.prohibitedIngredients != null){
                tempArr = [];
                this.dietRequirements.prohibitedIngredients.forEach(
                  (value) => {
                    tempArr.push(value.name);
                  })

                this.dietRequirementsForm.get('prohibitedIngredients')?.setValue(tempArr);
              }
                this.hours = this.dietRequirements.hours.slice();
              this.requireSave = false;

            }
          )
        }

        this.dietRequirementsForm.statusChanges.subscribe(
          (status) =>{
            if(status=="VALID"){
              this.isFormValid = true;
            }else{
              this.isFormValid = false;
            }
            this.requireSave = true;
          }
        )
    
        this.dietRequirementsForm.get('macro')?.valueChanges.subscribe(
          (value) => {
            this.dietRequirements.macro = value;
            this.calculateKcal();
          }
        );
    
        this.dietRequirementsForm.get('micro')?.valueChanges.subscribe(
          (value) => {
            this.dietRequirements.micro = value;
            this.calculateKcal();
          }
        );
    


      }    
    )
  }


  updateHour(event: any, index: number) {
    const value = event.target.value;
    if(value != ""){      
      if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
        this.hours[index] = value 
      } else {
        console.log("Input is invalid")
      }
    }else{
      this.hours.splice(index,1);
    }

    this.requireSave = true;

  }

  newHour(event: any) {

    var value = event.target.value;
    if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
      if (this.hours == undefined) {
        this.hours = [];
      }
      if(value.length ==4) {
        value = "0"+value;
      }
      const date = new Date(`2000-01-01T${value}:00`);
      const firstDate = new Date(`2000-01-01T${this.hours[0]}:00`);
      var index = 0;
      if(date<firstDate){
        index = 0;
      }else{
        index = this.hours.findIndex((time) => {
          const timeDate = new Date(`2000-01-01T${time}:00`);
          return timeDate > date;
        });
      }

      if (index === -1) {
        index = this.hours.length;
      }

      this.hours.splice(index, 0, value);

      event.target.value = '';
      this.requireSave = true;
    } else {
      
    }

  }


  canExit(): Promise<boolean> {
    if (this.requireSave == false) {
      return Promise.resolve(true);
    } else {
      this.alertMsg = "Save changes or die try'n";
      this.alert = true;
      return new Promise<boolean>((resolve, reject) => {
        this.alertSave = () => {
          this.alert = false;
          this.onSubmit(event);
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


  onSubmit(event: any){
    event.preventDefault();
    this.dietRequirements = this.dietRequirementsForm.value
    
    this.dietRequirements.requiredTags = [];
    this.dietRequirements.prohibitedTags = [];
    this.dietRequirements.requiredIngredients = [];
    this.dietRequirements.prohibitedIngredients = [];    
    this.dietRequirements.hours = this.hours;

    if(this.dietRequirementsForm.get('requiredTags')?.value != null){
      this.dietRequirementsForm.get('requiredTags')?.value.forEach((value: any)=>{
        this.dietRequirements.requiredTags.push(this.allTags.find(t => t.name == value)!);
      })
    }
    if(this.dietRequirementsForm.get('prohibitedTags')?.value != null){
      this.dietRequirementsForm.get('prohibitedTags')?.value.forEach((value: any)=>{
        this.dietRequirements.prohibitedTags.push(this.allTags.find(t => t.name == value)!);
      })
    }
    if(this.dietRequirementsForm.get('requiredIngredients')?.value != null){
      this.dietRequirementsForm.get('requiredIngredients')?.value.forEach((value: any)=>{
        this.dietRequirements.requiredIngredients.push(this.allIngredients.find(t => t.name == value)!);
      })
    }
    if(this.dietRequirementsForm.get('prohibitedIngredients')?.value != null){
      this.dietRequirementsForm.get('prohibitedIngredients')?.value.forEach((value: any)=>{
        this.dietRequirements.prohibitedIngredients.push(this.allIngredients.find(t => t.name == value)!);
      })
    }

    console.log(this.hours)

    if(this.dietRequirements.id != 0){
      this.dietRequirementsService.updateDietRequirements(this.dietRequirements).subscribe();
    }else{
      this.dietRequirementsService.addDietRequirements(this.dietRequirements).subscribe();
    } 

    this.requireSave = false;
    
  }

  calculateKcal(){
    const precision = 1;
    this.dietRequirements.macro.kcal = ((+this.dietRequirements.macro.proteins!*4)+(+this.dietRequirements.macro.carbohydrates!*4)+(+this.dietRequirements.macro.fat!*9)).toFixed(precision).toString();
    this.dietRequirementsForm.patchValue({macro: { kcal: this.dietRequirements.macro.kcal}}, {emitEvent: false});
  }

}
