import { Component, Input, OnInit } from '@angular/core';
import { DietRequirementsListItem } from 'src/app/models/diet/dietRequirementsListItem.model';

@Component({
  selector: 'app-diet-requirements-list-item',
  templateUrl: './diet-requirements-list-item.component.html',
  styleUrls: ['./diet-requirements-list-item.component.css']
})
export class DietRequirementsListItemComponent implements OnInit {
  @Input() dietRequirements!: DietRequirementsListItem;
  @Input() index!: number;
  ngOnInit(){}

}
