import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureComponent } from './feature.component';
import { MATERIAL_MODULES } from './material-modules';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SidenavMenuComponent } from './components';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FeatureComponent', () => {
  let component: FeatureComponent;
  let fixture: ComponentFixture<FeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MATERIAL_MODULES,
        NoopAnimationsModule,
        BrowserTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [FeatureComponent, SidenavMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
