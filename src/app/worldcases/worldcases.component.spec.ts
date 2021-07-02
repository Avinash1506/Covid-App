import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldcasesComponent } from './worldcases.component';

describe('WorldcasesComponent', () => {
  let component: WorldcasesComponent;
  let fixture: ComponentFixture<WorldcasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldcasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldcasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
