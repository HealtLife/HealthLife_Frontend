import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinaListComponent } from './rutina-list.component';

describe('RutinaListComponent', () => {
  let component: RutinaListComponent;
  let fixture: ComponentFixture<RutinaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RutinaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutinaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
