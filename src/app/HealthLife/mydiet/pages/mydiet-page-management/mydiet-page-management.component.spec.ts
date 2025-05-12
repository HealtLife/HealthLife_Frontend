import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MydietManagementComponent } from './mydiet-page-management.component';

describe('MydietManagementComponent', () => {
  let component: MydietManagementComponent;
  let fixture: ComponentFixture<MydietManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MydietManagementComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MydietManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
