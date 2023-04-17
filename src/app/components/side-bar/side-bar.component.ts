import { Component } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  isCollapsed: boolean = true;
 /*constructor(private collapseService: NgbCollapse) { }
  
  collapseNavbar(): void {
   // this.collapseService.collapse('navbarTogglerDemo03');
  }*/

}
