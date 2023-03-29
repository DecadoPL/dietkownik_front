import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietListItemComponent } from './diet-list-item.component';

describe('DietListItemComponent', () => {
  let component: DietListItemComponent;
  let fixture: ComponentFixture<DietListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DietListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
