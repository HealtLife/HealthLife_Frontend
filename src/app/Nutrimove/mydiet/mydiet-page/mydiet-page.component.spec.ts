import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MydietPageComponent } from './mydiet-page.component';

// @ts-ignore
describe('MydietPageComponent', () => {
  let component: MydietPageComponent;
  let fixture: ComponentFixture<MydietPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MydietPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MydietPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // @ts-ignore
  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
function beforeEach(arg0: () => Promise<void>) {
    throw new Error('Function not implemented.');
}

function expect(component: MydietPageComponent) {
    throw new Error('Function not implemented.');
}

