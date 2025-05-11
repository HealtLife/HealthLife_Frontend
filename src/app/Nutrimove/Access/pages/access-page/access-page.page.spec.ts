import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessPagePage } from './access-page.page';

describe('AccessPagePage', () => {
  let component: AccessPagePage;
  let fixture: ComponentFixture<AccessPagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessPagePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
