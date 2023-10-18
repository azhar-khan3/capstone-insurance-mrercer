import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedPolicyComponent } from './recommended-policy.component';

describe('RecommendedPolicyComponent', () => {
  let component: RecommendedPolicyComponent;
  let fixture: ComponentFixture<RecommendedPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendedPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
