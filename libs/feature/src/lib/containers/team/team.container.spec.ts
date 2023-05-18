import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamContainer } from './team.container';

describe('TeamContainer', () => {
  let component: TeamContainer;
  let fixture: ComponentFixture<TeamContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
