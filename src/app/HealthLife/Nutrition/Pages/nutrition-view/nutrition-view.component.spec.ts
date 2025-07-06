import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionViewComponent } from './nutrition-view.component';

describe('NutritionViewComponent', () => {
  let component: NutritionViewComponent;
  let fixture: ComponentFixture<NutritionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutritionViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutritionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
