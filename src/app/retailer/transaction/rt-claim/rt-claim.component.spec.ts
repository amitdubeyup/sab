import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtClaimComponent } from './rt-claim.component';

describe('RtClaimComponent', () => {
  let component: RtClaimComponent;
  let fixture: ComponentFixture<RtClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtClaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RtClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
