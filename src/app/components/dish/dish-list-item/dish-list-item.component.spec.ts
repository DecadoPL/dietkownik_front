import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishListItemComponent } from './dish-list-item.component';

describe('DishListItemComponent', () => {
  let component: DishListItemComponent;
  let fixture: ComponentFixture<DishListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
