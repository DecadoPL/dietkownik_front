import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient/ingredient.model';
import { Macronutrients } from 'src/app/models/shared/macronutrients.model';
import { PortionName } from 'src/app/models/ingredient/PortionName.model';
import { TagService } from 'src/app/services/tag.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { PortionNameService } from 'src/app/services/PortionName.service';
import { Micronutrients } from 'src/app/models/shared/micronutrients.model';
import { TagListItem } from 'src/app/models/shared/tagListItem.model';
import { IDeactivateComponent } from 'src/app/services/can-deactivate-guard.service';
import { Portion } from 'src/app/models/ingredient/portion.model';

@Component({
  selector: 'app-ingredient-details',
  templateUrl: './ingredient-details.component.html',
  styleUrls: ['./ingredient-details.component.css']
})
export class IngredientDetailsComponent implements OnInit, IDeactivateComponent{
  @ViewChild('image') image!: ElementRef;

  ingredient: Ingredient = new Ingredient();
  portionMacro = new Macronutrients();
  portionMicro = new Micronutrients();
  ingredientForm!: FormGroup;
  isFormValid!: boolean;
  requireSave: boolean = false;
  saveClicked: boolean = false;
  alertMsg!: string;
  alert: boolean = false;
  isPortionSelected!: boolean;
  PortionNames!: PortionName[];
  image64base!: string;
  ingrTags!: TagListItem[];
  allTags!: TagListItem[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ingredientService: IngredientService,
              private PortionNameService: PortionNameService,
              private tagService: TagService,
              private fb: FormBuilder
             ){}

  ngOnInit(){

    this.ingredientForm = this.fb.group({
      id: this.ingredient.id,
      name: [this.ingredient.name, Validators.required],
      image: [""],
      brand: [this.ingredient.brand],
      ean: [this.ingredient.ean],
      description: [this.ingredient.description],

      macro: this.fb.group({
        proteins: [this.ingredient.macro.proteins, [Validators.required, Validators.min(0), Validators.max(1000)]],
        carbohydrates: [this.ingredient.macro.carbohydrates, [Validators.required, Validators.min(0), Validators.max(1000)]],
        fat: [this.ingredient.macro.fat, [Validators.required, Validators.min(0), Validators.max(1000)]],
        kcal: [this.ingredient.macro.kcal],
        fibers: [this.ingredient.macro.fibers, [Validators.required, Validators.min(0), Validators.max(1000)]],
        cholesterol: [this.ingredient.macro.cholesterol, [Validators.required, Validators.min(0), Validators.max(1000)]]
      }),

      micro: this.fb.group({
        potassium: [this.ingredient.micro.potassium, [Validators.min(0), Validators.max(1000)]],
        sodium: [this.ingredient.micro.sodium, [Validators.min(0), Validators.max(1000)]],
        vitaminA: [this.ingredient.micro.vitaminA, [Validators.min(0), Validators.max(1000)]],
        vitaminC: [this.ingredient.micro.vitaminC, [Validators.min(0), Validators.max(1000)]],
        vitaminB6: [this.ingredient.micro.vitaminB6, [Validators.min(0), Validators.max(1000)]],
        magnesium: [this.ingredient.micro.magnesium, [Validators.min(0), Validators.max(1000)]],
        vitaminD: [this.ingredient.micro.vitaminD, [Validators.min(0), Validators.max(1000)]],
        vitaminB12: [this.ingredient.micro.vitaminB12, [Validators.min(0), Validators.max(1000)]],
        calcium: [this.ingredient.micro.calcium, [Validators.min(0), Validators.max(1000)]],
        iron: [this.ingredient.micro.iron, [Validators.min(0), Validators.max(1000)]]
      }), 

      tags:[], 
      newPortion: this.fb.group({
        name: [],
        quantity: []
      }),
      portions: this.fb.array([]), 
    });

    this.tagService.getTagsList().subscribe(
      (data) => {
        this.allTags = data;
      }
    );

    this.PortionNameService.getPortionNames().subscribe(
      (data) => {
        this.PortionNames = data;
      }
    );  

    this.route.params.subscribe(
      (params: Params) => {
        if(params['id']!=undefined){
          this.ingredientService.getIngredient(+params['id']).subscribe(
            (data: Ingredient) => {
              this.ingredient = data;

              this.ingredientForm.patchValue({
                id: this.ingredient.id,
                name: this.ingredient.name,
                image: "",
                brand: this.ingredient.brand,
                ean: this.ingredient.ean,
                description: this.ingredient.description,
          
                macro: {
                  proteins: this.ingredient.macro.proteins,
                  carbohydrates: this.ingredient.macro.carbohydrates,
                  fat: this.ingredient.macro.fat,
                  kcal: this.ingredient.macro.kcal,
                  fibers: this.ingredient.macro.fibers,
                  cholesterol: this.ingredient.macro.cholesterol
                },
          
                micro: {
                  potassium: this.ingredient.micro.potassium,
                  sodium: this.ingredient.micro.sodium,
                  vitaminA: this.ingredient.micro.vitaminA,
                  vitaminC: this.ingredient.micro.vitaminC,
                  vitaminB6: this.ingredient.micro.vitaminB6,
                  magnesium: this.ingredient.micro.magnesium,
                  vitaminD: this.ingredient.micro.vitaminD,
                  vitaminB12: this.ingredient.micro.vitaminB12,
                  calcium: this.ingredient.micro.calcium,
                  iron: this.ingredient.micro.iron
                }, 
              });
              
              if(this.ingredient.tags != null){
                var tempArr: string[] = [];
                this.ingredient.tags.forEach(
                  (value) => {
                    tempArr.push(value.name);
                  })
                this.ingredientForm.get('tags')?.setValue(tempArr);
              }

              this.ingredient.portions.forEach(
                (value, index) => {
                  this.portions.push(this.newPortion(value));
                }
              )

              this.portions.controls.forEach((control ,index)=> {
                control.get('quantity')?.valueChanges.subscribe(value => {
                  if(value==""){
                    this.portions.removeAt(index, {emitEvent: false})
                  }
                });
              });
              
              this.ingredientForm.patchValue({macro: { kcal: this.calculateKcal(this.ingredientForm.get('macro')?.value)}}, {emitEvent: false});
              this.image.nativeElement.src= "data:image/gif;base64,"+this.ingredient.image;       
              this.subscriptions();
            }
          )
          this.requireSave = false;
        }else{
          this.subscriptions();
        }
      }
    ) 



    this.ingredientForm.get('macro')?.get('kcal')?.disable();
    
  }


  get portions() : FormArray {
    return this.ingredientForm.get("portions") as FormArray
  }

  newPortion(portion: Portion): FormGroup {
    return this.fb.group({
      name: portion.name,
      quantity: portion.quantity,
    })
  }

  newPortionEnter(){
    let newPortion = this.ingredientForm.get('newPortion')?.value;
    this.portions.push(this.newPortion(new Portion(0,newPortion.name, newPortion.quantity)));

    this.portions.controls.forEach((control ,index)=> {
      control.get('quantity')?.valueChanges.subscribe(value => {
        if(value==""){
          this.portions.removeAt(index, {emitEvent: false})
        }
      });
    });
    
  }

  subscriptions(){

    this.ingredientForm.statusChanges.subscribe(
      (status) =>{
        if(status=="VALID"){
          this.isFormValid = true;
        }else{
          this.isFormValid = false;
        }
        this.requireSave = true;
      }
    )




    this.ingredientForm.get('macro')?.valueChanges.subscribe(
      (value) => {
        this.ingredient.macro = value;
        this.ingredientForm.patchValue({macro: { kcal: this.calculateKcal(value)}}, {emitEvent: false});
      }
    )

    this.ingredientForm.get('micro')?.valueChanges.subscribe(
      (value) => {
        this.ingredient.micro = value;
      }
    )

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

  processFile(imageInput: any) {
    this.convertFile(imageInput.files[0]).subscribe(base64output => {
      this.image64base = base64output;
      this.image.nativeElement.src= "data:image/gif;base64,"+this.image64base;
    }); 
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target!.result!.toString()));
    return result;
  }

  onSubmit(){

    this.ingredient = this.ingredientForm.value;

    this.ingredient.portions = [];
    if(this.ingredientForm.get('portions')?.value != null){
      this.ingredientForm.get('portions')?.value.forEach((value: any)=>{
        this.ingredient.portions.push(value);
      })
    }
    this.ingredient.tags = [];
    if(this.ingredientForm.get('tags')?.value != null){
      this.ingredientForm.get('tags')?.value.forEach((value: any)=>{
        this.ingredient.tags.push(this.allTags.find(t => t.name == value)!);
      })
    }
  
    this.ingredient.image = this.image64base;
    this.ingredient.macro.kcal = this.calculateKcal(this.ingredient.macro)

    if(this.ingredient.id==0){
      this.ingredientService.addIngredient(this.ingredient).subscribe();
    }else{
      this.ingredientService.updateIngredient(this.ingredient).subscribe();
    }
    this.requireSave = false;

    //this.router.navigate(['ingredients']);
  }

  calculateKcal(macro: Macronutrients){
    return ((+macro.proteins!*4)+(+macro.carbohydrates!*4)+(+macro.fat!*9)).toFixed(1).toString();
  }


  
}
