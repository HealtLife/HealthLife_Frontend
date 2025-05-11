import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisContentPage } from './analysis-content.page';

describe('AnalysisContentPage', () => {
  let component: AnalysisContentPage;
  let fixture: ComponentFixture<AnalysisContentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisContentPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
