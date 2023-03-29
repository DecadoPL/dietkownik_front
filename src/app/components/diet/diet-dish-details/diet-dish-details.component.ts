import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DietDish } from 'src/app/models/diet/dietDish.model';
import { DietService } from 'src/app/services/diet.service';

@Component({
  selector: 'app-diet-dish-details',
  templateUrl: './diet-dish-details.component.html',
  styleUrls: ['./diet-dish-details.component.css']
})
export class DietDishDetailsComponent implements OnInit{

  dish!: DietDish;
  dietId!: number;
  dayId!: number;
  dishId!: number;

  constructor(private route: ActivatedRoute,
              private dietService: DietService){}

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.dietId = +params['dietId'];
        this.dayId = +params['dayId'];
        this.dishId = +params['dishId'];
        //this.dish = this.dietService.getDietDish(this.dietId, this.dayId, this.dishId)
      }
    )
  }

}
