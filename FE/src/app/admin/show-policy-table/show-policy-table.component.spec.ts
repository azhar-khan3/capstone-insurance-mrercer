import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPolicyTableComponent } from './show-policy-table.component';

describe('ShowPolicyTableComponent', () => {
  let component: ShowPolicyTableComponent;
  let fixture: ComponentFixture<ShowPolicyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPolicyTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPolicyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
