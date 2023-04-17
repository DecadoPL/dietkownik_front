import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietRequirementsListComponent } from './diet-requirements-list.component';

describe('DietRequirementsListComponent', () => {
  let component: DietRequirementsListComponent;
  let fixture: ComponentFixture<DietRequirementsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietRequirementsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DietRequirementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
