import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietRequirementsDetailsComponent } from './diet-requirements-details.component';

describe('DietRequirementsDetailsComponent', () => {
  let component: DietRequirementsDetailsComponent;
  let fixture: ComponentFixture<DietRequirementsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietRequirementsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DietRequirementsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
