import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DietDish } from 'src/app/models/diet/dietDish.model';


@Component({
  selector: 'app-diet-dish-card',
  templateUrl: './diet-dish-card.component.html',
  styleUrls: ['./diet-dish-card.component.css']
})
export class DietDishCardComponent implements OnInit {
  @Input() dish!: DietDish;
  @Input() dayId!: number;
  @Input() dishId!: number;
  @Input() dishIndex!: number;
  @Output() deleteCard = new EventEmitter<[number, number]>();
  
  ngOnInit(){}

}
