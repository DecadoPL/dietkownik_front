import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietDishesTrayComponent } from './diet-dishes-tray.component';

describe('DietDishesTrayComponent', () => {
  let component: DietDishesTrayComponent;
  let fixture: ComponentFixture<DietDishesTrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietDishesTrayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DietDishesTrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
