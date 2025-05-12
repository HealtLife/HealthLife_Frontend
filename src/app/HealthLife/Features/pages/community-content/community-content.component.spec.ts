import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityContentComponent } from './community-content.component';

describe('CommunityContentComponent', () => {
  let component: CommunityContentComponent;
  let fixture: ComponentFixture<CommunityContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
