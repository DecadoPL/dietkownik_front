import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietRequirementsListItemComponent } from './diet-requirements-list-item.component';

describe('DietRequirementsListItemComponent', () => {
  let component: DietRequirementsListItemComponent;
  let fixture: ComponentFixture<DietRequirementsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietRequirementsListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DietRequirementsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
