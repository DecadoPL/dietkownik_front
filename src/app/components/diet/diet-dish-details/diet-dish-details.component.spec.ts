import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietDishDetailsComponent } from './diet-dish-details.component';

describe('DietDishDetailsComponent', () => {
  let component: DietDishDetailsComponent;
  let fixture: ComponentFixture<DietDishDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietDishDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DietDishDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
