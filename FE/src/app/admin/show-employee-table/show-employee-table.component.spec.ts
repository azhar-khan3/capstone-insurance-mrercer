import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEmployeeTableComponent } from './show-employee-table.component';

describe('ShowEmployeeTableComponent', () => {
  let component: ShowEmployeeTableComponent;
  let fixture: ComponentFixture<ShowEmployeeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowEmployeeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEmployeeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
