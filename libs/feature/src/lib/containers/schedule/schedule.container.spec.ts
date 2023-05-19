import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleContainer } from './schedule.container';
import { providers } from '@getlab/data-access';
import { MATERIAL_MODULES } from '../../material-modules';
import { ReactiveFormsModule } from '@angular/forms';
import { WeekdayPipe } from '../../pipes/weekday.pipe';

providers.infrastructure();
providers.useCases();
providers.application();

describe('ScheduleContainer', () => {
  let component: ScheduleContainer;
  let fixture: ComponentFixture<ScheduleContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MATERIAL_MODULES,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      declarations: [ScheduleContainer, WeekdayPipe],
      providers: [providers.transfer()],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
