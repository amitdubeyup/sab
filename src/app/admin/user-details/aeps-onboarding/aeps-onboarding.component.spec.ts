import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AepsOnboardingComponent } from './aeps-onboarding.component';

describe('AepsOnboardingComponent', () => {
  let component: AepsOnboardingComponent;
  let fixture: ComponentFixture<AepsOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AepsOnboardingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AepsOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
