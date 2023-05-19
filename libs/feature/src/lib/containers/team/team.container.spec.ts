import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamContainer } from './team.container';
import { providers } from '@getlab/data-access';
import { MATERIAL_MODULES } from '../../material-modules';

providers.infrastructure();
providers.useCases();
providers.application();

describe('TeamContainer', () => {
  let component: TeamContainer;
  let fixture: ComponentFixture<TeamContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamContainer],
      imports: [MATERIAL_MODULES, BrowserAnimationsModule, ReactiveFormsModule],
      providers: [providers.transfer()],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
