import { Component, Input, OnInit } from '@angular/core';
import { DishListItem } from 'src/app/models/dish/dishListItem.model';


@Component({
  selector: 'app-dish-list-item',
  templateUrl: './dish-list-item.component.html',
  styleUrls: ['./dish-list-item.component.css']
})
export class DishListItemComponent implements OnInit{
  @Input() dish!: DishListItem;
  @Input() index!: number;

  ngOnInit(){}
}
