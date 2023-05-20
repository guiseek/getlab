import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SpreadsheetContainer } from './spreadsheet.container';
import { providers } from '@getlab/data-access';
import { MATERIAL_MODULES } from '../../material-modules';
import { WeekdayPipe } from '../../pipes/weekday.pipe';
import { ReactiveFormsModule } from '@angular/forms';

providers.infrastructure();
providers.useCases();
providers.application();

describe('SpreadsheetContainer', () => {
  let component: SpreadsheetContainer;
  let fixture: ComponentFixture<SpreadsheetContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MATERIAL_MODULES,
        RouterTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
      declarations: [SpreadsheetContainer, WeekdayPipe],
      providers: [providers.transfer()],
    }).compileComponents();

    fixture = TestBed.createComponent(SpreadsheetContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
