import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleContainer } from './schedule.container';

describe('ScheduleContainer', () => {
  let component: ScheduleContainer;
  let fixture: ComponentFixture<ScheduleContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
