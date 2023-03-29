import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietDishCardComponent } from './diet-dish-card.component';

describe('DishPreviewComponent', () => {
  let component: DietDishCardComponent;
  let fixture: ComponentFixture<DietDishCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietDishCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DietDishCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
