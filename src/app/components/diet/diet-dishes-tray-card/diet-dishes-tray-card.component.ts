import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DietDish } from 'src/app/models/diet/dietDish.model';

@Component({
  selector: 'app-diet-dishes-tray-card',
  templateUrl: './diet-dishes-tray-card.component.html',
  styleUrls: ['./diet-dishes-tray-card.component.css']
})
export class DietDishesTrayCardComponent implements OnInit {
  @Input() dish!: DietDish;
  @Output() addCard = new EventEmitter<DietDish>();
  portionsLeft!: string;

  ngOnInit(){
    if(this.dish){
      this.portionsLeft = this.dish.quantity.split("/")[0]
    } 
  }

  
}
