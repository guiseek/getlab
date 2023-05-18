import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpreadsheetContainer } from './spreadsheet.container';

describe('SpreadsheetContainer', () => {
  let component: SpreadsheetContainer;
  let fixture: ComponentFixture<SpreadsheetContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpreadsheetContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(SpreadsheetContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
