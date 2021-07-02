import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbydistrictComponent } from './searchbydistrict.component';

describe('SearchbydistrictComponent', () => {
  let component: SearchbydistrictComponent;
  let fixture: ComponentFixture<SearchbydistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchbydistrictComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbydistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
