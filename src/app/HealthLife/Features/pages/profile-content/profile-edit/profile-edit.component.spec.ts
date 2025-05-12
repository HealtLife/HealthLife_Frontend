import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileEditComponent } from './profile-edit.component';
import { AuthenApiService} from "../../../../Access/services/authen-api.service"
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProfileEditComponent', () => {
  let component: ProfileEditComponent;
  let fixture: ComponentFixture<ProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileEditComponent],
      imports: [HttpClientTestingModule],
      providers: [AuthenApiService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ng=n
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
