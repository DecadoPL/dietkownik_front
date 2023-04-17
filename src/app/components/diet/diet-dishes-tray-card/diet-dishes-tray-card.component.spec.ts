import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietDishesTrayCardComponent } from './diet-dishes-tray-card.component';

describe('DietDishesTrayCardComponent', () => {
  let component: DietDishesTrayCardComponent;
  let fixture: ComponentFixture<DietDishesTrayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietDishesTrayCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DietDishesTrayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
