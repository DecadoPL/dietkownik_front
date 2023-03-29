import { Component, Input, OnInit } from '@angular/core';
import { IngredientListItem } from 'src/app/models/ingredient/ingredientListItem.model';

@Component({
  selector: 'app-ingredient-list-item',
  templateUrl: './ingredient-list-item.component.html',
  styleUrls: ['./ingredient-list-item.component.css']
})
export class IngredientListItemComponent implements OnInit{
  @Input() ingredient!: IngredientListItem;
  @Input() index!: number;

  ngOnInit(){}
}
