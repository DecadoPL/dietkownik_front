import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientListItemComponent } from './ingredient-list-item.component';

describe('IngredientListItemComponent', () => {
  let component: IngredientListItemComponent;
  let fixture: ComponentFixture<IngredientListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
