import { Component, Input, OnInit } from '@angular/core';
import { Diet } from 'src/app/models/diet/diet.model';
import { DietListItem } from 'src/app/models/diet/dietListItem.model';

@Component({
  selector: 'app-diet-list-item',
  templateUrl: './diet-list-item.component.html',
  styleUrls: ['./diet-list-item.component.css']
})
export class DietListItemComponent implements OnInit {
  
  @Input() diet!: DietListItem;
  @Input() index!: number;

  ngOnInit(){}


}
