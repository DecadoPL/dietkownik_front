import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, map, Observable, OperatorFunction, ReplaySubject, switchMap } from 'rxjs';
import { Dish } from 'src/app/models/dish/dish.model';
import { IDeactivateComponent } from 'src/app/services/can-deactivate-guard.service';
import { DishService } from 'src/app/services/dish.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { IngredientListItem } from 'src/app/models/ingredient/ingredientListItem.model';
import { DishDTO } from 'src/app/models/dish/dishDTO.model';
import { DishIngredientSave } from 'src/app/models/dish/dishIngredientSave.model';
import { DishIngredient } from 'src/app/models/dish/dishIngredient.model';
import { TagListItem } from 'src/app/models/shared/tagListItem.model';
import { TagService } from 'src/app/services/tag.service';
import { Portion } from 'src/app/models/ingredient/portion.model';


@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit, IDeactivateComponent{
  @ViewChild('image') image!: ElementRef;
  
	newIngr!: IngredientListItem;
  dish: Dish = new Dish();
  dishForm!: FormGroup;
  isFormValid: boolean = false;
  requireSave: boolean = false;
  alertMsg!: string;
  alert: boolean = false;
  image64base!: string;
  ingrTags!: TagListItem[];
  allTags!: TagListItem[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dishService: DishService,
              private ingredientService: IngredientService,
              private tagService: TagService,
              private fb:FormBuilder){}  

  ngOnInit(){

    this.dishForm = this.fb.group({
      id: +this.dish.id,
      name: this.dish.name,
      image: "",
      portions: this.dish.portions,
      description: this.dish.description,
      recipe: this.dish.recipe,
      cookingTime: this.dish.cookingTime,
      ingredients: this.fb.array([]), 
      macro: this.fb.group({
        proteins: this.dish.macro.proteins,
        carbohydrates: this.dish.macro.carbohydrates,
        fat: this.dish.macro.fat,
        kcal:this.dish.macro.kcal,
        fibers: this.dish.macro.fibers,
        cholesterol: this.dish.macro.cholesterol
      }),
      micro: this.fb.group({
        potassium: this.dish.micro.potassium,
        sodium: this.dish.micro.sodium,
        vitaminA: this.dish.micro.vitaminA,
        vitaminC: this.dish.micro.vitaminC,
        vitaminB6: this.dish.micro.vitaminB6,
        magnesium: this.dish.micro.magnesium,
        vitaminD: this.dish.micro.vitaminD,
        vitaminB12: this.dish.micro.vitaminB12,
        calcium: this.dish.micro.calcium,
        iron: this.dish.micro.iron
      }),
      tags:[], 
    })

    this.tagService.getTagsList().subscribe(
      (data) => {
        this.allTags = data;
      }
    );

    this.route.params.subscribe(
      (params: Params) => {
        if(params['id']!=undefined && params['id']!='new'){
          this.dishService.getDish(+params['id']).subscribe(
            (data: Dish) => {
              this.dish = data;

              console.log("this.dish", this.dish)
              this.dishForm.patchValue({
                id: this.dish.id,
                name: this.dish.name,
                image: "",
                portions: this.dish.portions,
                description: this.dish.description,
                recipe: this.dish.recipe,
                cookingTime: this.dish.cookingTime,
                
              })

              if(this.dish.tags != null) {
                var tempArr: string[] = [];
                this.dish.tags.forEach(
                  (value) => {
                    tempArr.push(value.name);
                  })
                this.dishForm.get('tags')?.setValue(tempArr);
              }

              this.image.nativeElement.src  = "data:image/gif;base64,"+this.dish.image;

              this.dish.ingredients.forEach(
                (ingr, index) => {
                  ingr.ingredient.portions.unshift(new Portion(0,"100g","100"));
                  this.ingredients.push(this.newIngredient(ingr));
                }
              )


              this.ingredients.controls.forEach((control ,index)=> {

                control.get('portion')?.setValue(this.dish.ingredients[index].portion.name);
                this.updateIngredient(index,this.dish.ingredients[index].quantity, this.dish.ingredients[index].portion.name);
                this.calculateDishMacro();

                control.get('quantity')?.valueChanges.subscribe(quantity => {
                  let portionQuantity = control.get('portion')?.value
                  this.updateIngredient(index,quantity, portionQuantity);
                  this.calculateDishMacro();
                });

                control.get('portion')?.valueChanges.subscribe(portion => {
                  let quantity = control.get('quantity')?.value
                  this.updateIngredient(index,quantity, portion);
                  this.calculateDishMacro();
                });

              });

              this.ingredients.controls.forEach((control ,index)=> {
                if(this.dish.ingredients[index].portion.name==null){
                  control.get('portion')?.setValue(this.dish.ingredients[0].portion.name);
                }else{
                  control.get('portion')?.setValue(this.dish.ingredients[index].portion.name);
                }
              });


              this.dishForm.statusChanges.subscribe(
                (status) =>{
                  if(status=="VALID"){
                    this.isFormValid = true;
                  }else{
                    this.isFormValid = false;
                  }
                  this.requireSave = true;
                }
              )


              this.calculateDishMacro();

              this.requireSave = false;
            }
          );
        }
      }
    )

    this.dishForm.statusChanges.subscribe(
      (status) =>{
        if(status=="VALID"){
          this.isFormValid = true;
        }else{
          this.isFormValid = false;
        }
        this.requireSave = true;
      }
    )

    this.dishForm.get('portions')?.valueChanges.subscribe(
      value =>{
        this.calculateDishMacro();
      }
    )
  }

  changePortionName(index: number, name: any){
    var selectEl = document.getElementById("portions");
    selectEl!.style.width = (+this.getTextWidth(name.value)+25) + "px";
  }

  getTextWidth(text: any) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    ctx!.font = getComputedStyle(document.body).getPropertyValue("font");
    var metrics = ctx!.measureText(text);
    return metrics.width;
  }

	formatter = (ingr: IngredientListItem) => ingr.name;

  search: OperatorFunction<string, readonly IngredientListItem[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter((term) => term.length >= 2),
    switchMap((term) => this.ingredientService.searchIngredients(term))
  );

  calculateDishMacro(){ 
    this.dishForm.patchValue({
      macro:{
        proteins: '',
        carbohydrates: '',
        fat: '',
        kcal: ''
      }
    })

    const portions = this.dishForm.get('portions')?.value

    this.ingredients.controls.forEach((control)=> {
      console.log(control.value)
      this.dishForm.patchValue({
        macro:{
          proteins: (+this.dishForm.get('macro')?.get('proteins')?.value + (+control.get('proteins')?.value)/portions).toFixed(1).toString(),
          carbohydrates: (+this.dishForm.get('macro')?.get('carbohydrates')?.value + (+control.get('carbohydrates')?.value)/portions).toFixed(1).toString(),
          fat: (+this.dishForm.get('macro')?.get('fat')?.value + (+control.get('fat')?.value)/portions).toFixed(1).toString(),
          kcal: (+this.dishForm.get('macro')?.get('kcal')?.value + (+control.get('kcal')?.value)/portions).toFixed(1).toString(),
        }
      })
    });
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

    var dishDTO: DishDTO ={
      id: +this.dishForm.get('id')?.value,
      name: this.dishForm.get('name')?.value,
      image: this.image64base,
      portions: this.dishForm.get('portions')?.value,
      description: this.dishForm.get('description')?.value,
      recipe: this.dishForm.get('recipe')?.value,
      cookingTime: this.dishForm.get('cookingTime')?.value,
      ingredients: [],
      macro: {
        proteins: this.dishForm.get('macro')?.get('proteins')?.value,
        carbohydrates: this.dishForm.get('macro')?.get('carbohydrates')?.value,
        cholesterol: this.dishForm.get('macro')?.get('cholesterol')?.value,
        fat: this.dishForm.get('macro')?.get('fat')?.value,
        fibers: this.dishForm.get('macro')?.get('fibers')?.value,
        kcal: this.dishForm.get('macro')?.get('kcal')?.value
      }, 
      micro: {
        calcium: this.dishForm.get('micro')?.get('calcium')?.value,
        iron: this.dishForm.get('micro')?.get('iron')?.value,
        magnesium: this.dishForm.get('micro')?.get('magnesium')?.value,
        potassium: this.dishForm.get('micro')?.get('potassium')?.value,
        sodium: this.dishForm.get('micro')?.get('sodium')?.value,
        vitaminA: this.dishForm.get('micro')?.get('vitaminA')?.value,
        vitaminB12: this.dishForm.get('micro')?.get('vitaminB12')?.value,
        vitaminB6: this.dishForm.get('micro')?.get('vitaminB6')?.value,
        vitaminC: this.dishForm.get('micro')?.get('vitaminC')?.value,
        vitaminD: this.dishForm.get('micro')?.get('vitaminD')?.value,
      },
      tags: [],
    };


    if(this.dishForm.get('tags')?.value != null){
      this.dishForm.get('tags')?.value.forEach((value: any)=>{
        dishDTO.tags.push(this.allTags.find(t => t.name == value)!);
      })
    }
    
    if(this.ingredients.controls != null){
      this.ingredients.controls.forEach(
        (value,index)=> {
          var dishIngrDTO: DishIngredientSave = {
            id: 0,
            ingredientId: value.get('id')?.value,
            dishId: +this.dishForm.get('id')?.value,
            portionNameId: this.dish.ingredients[index].portion.id,
            quantity: value.get('quantity')?.value.toString()
          }
          dishDTO.ingredients.push(dishIngrDTO);

        }
      )
    }

    if(this.isFormValid == true){
      if(this.dish.id != 0){
        this.dishService.updateDish(dishDTO).subscribe();
      }else{
        this.dishService.addDish(dishDTO).subscribe();
      } 
      this.requireSave = false;

      //this.router.navigate(['dishes']);
    }
  }

  get ingredients() : FormArray {
    return this.dishForm.get("ingredients") as FormArray
  }

  newIngredient(ingr: DishIngredient): FormGroup {
    return this.fb.group({
      id: ingr.ingredient.id,
      name: ingr.ingredient.name,
      proteins: ingr.ingredient.macro.proteins,
      carbohydrates: ingr.ingredient.macro.carbohydrates,
      fat: ingr.ingredient.macro.fat,
      kcal: ingr.ingredient.macro.kcal,
      portion: ['100g', Validators.required],
      quantity: ingr.quantity,
    })
  }

  addIngredient() {
    if(this.newIngr != undefined){
      this.ingredientService.getIngredient(this.newIngr.id).subscribe(
        (data) => {
          var dishIngr: DishIngredient = ({
            id:  this.ingredients.controls.length,
            ingredient: data,
            quantity: "1",
            portion: new Portion(0,"100g","100")
          })

          dishIngr.ingredient.portions.unshift(new Portion(0,"100g","100"))
          this.ingredients.push(this.newIngredient(dishIngr));
          this.dish.ingredients.push(dishIngr);

          this.ingredients.controls.forEach((control ,index)=> {
            control.get('quantity')?.valueChanges.subscribe(quantity => {
              let portionQuantity = control.get('portion')?.value
              this.updateIngredient(index,quantity, portionQuantity);
              this.calculateDishMacro();
            });
          });

          this.ingredients.controls.forEach((control ,index)=> {
            control.get('portion')?.valueChanges.subscribe(portion => {
              let quantity = control.get('quantity')?.value
              this.updateIngredient(index,quantity, portion);
              this.calculateDishMacro();
            });
          });
          this.calculateDishMacro();
        });
        const input = document.getElementById('ingredientSearchInput') as HTMLInputElement;
        if (input) {
          input.value = '';
        }
    }
  }

  showHighlightedIngredientMacro(){}

  removeIngredient(i:number) {
    this.ingredients.removeAt(i);
    this.dish.ingredients.splice(i,1);
    this.calculateDishMacro();
  }

  updateIngredient(index:number, ingrQuantity:string, portionQuantityName: string){
    const precision = 1;
    let portionQuantityNumber = 1;

    if(portionQuantityName != null){
      const portionQuantityIndex = this.dish.ingredients[index].ingredient.portions.findIndex(x=>x.name==portionQuantityName);
      portionQuantityNumber = (+this.dish.ingredients[index].ingredient.portions[portionQuantityIndex].quantity/100);
      this.dish.ingredients[index].portion = this.dish.ingredients[index].ingredient.portions[portionQuantityIndex];
    }else{
      this.dish.ingredients[index].portion = this.dish.ingredients[index].ingredient.portions[0];
    }

    this.ingredients.controls[index].patchValue({  
      proteins: (+this.dish.ingredients[index].ingredient.macro.proteins *portionQuantityNumber* +ingrQuantity).toFixed(precision).toString(),
      carbohydrates: (+this.dish.ingredients[index].ingredient.macro.carbohydrates * +ingrQuantity).toFixed(precision).toString(),
      fat: (+this.dish.ingredients[index].ingredient.macro.fat * +ingrQuantity).toFixed(precision).toString(),
      kcal: (+this.dish.ingredients[index].ingredient.macro.kcal * +ingrQuantity).toFixed(precision).toString(),
    });
  }
}

