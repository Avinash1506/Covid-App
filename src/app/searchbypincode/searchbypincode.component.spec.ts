import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbypincodeComponent } from './searchbypincode.component';

describe('SearchbypincodeComponent', () => {
  let component: SearchbypincodeComponent;
  let fixture: ComponentFixture<SearchbypincodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchbypincodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbypincodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
