import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserContainer } from './user.container';
import { providers } from '@getlab/data-access';
import { MATERIAL_MODULES } from '../../material-modules';

providers.infrastructure();
providers.useCases();
providers.application();

describe('UserContainer', () => {
  let component: UserContainer;
  let fixture: ComponentFixture<UserContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserContainer],
      imports: [
        MATERIAL_MODULES,
        RouterTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
      providers: [providers.transfer()],
    }).compileComponents();

    fixture = TestBed.createComponent(UserContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
