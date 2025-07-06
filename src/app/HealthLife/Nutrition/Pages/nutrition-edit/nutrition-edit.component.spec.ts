import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionEditComponent } from './nutrition-edit.component';

describe('NutritionEditComponent', () => {
  let component: NutritionEditComponent;
  let fixture: ComponentFixture<NutritionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutritionEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutritionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
