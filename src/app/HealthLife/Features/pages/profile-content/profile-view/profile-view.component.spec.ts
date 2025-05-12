import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileViewComponent } from './profile-view.component';
import { AuthenApiService} from "../../../../Access/services/authen-api.service"
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProfileViewComponent', () => {
  let component: ProfileViewComponent;
  let fixture: ComponentFixture<ProfileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileViewComponent],
      imports: [HttpClientTestingModule],
      providers: [AuthenApiService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
