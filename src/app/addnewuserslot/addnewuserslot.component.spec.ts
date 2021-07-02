import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewuserslotComponent } from './addnewuserslot.component';

describe('AddnewuserslotComponent', () => {
  let component: AddnewuserslotComponent;
  let fixture: ComponentFixture<AddnewuserslotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewuserslotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewuserslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
