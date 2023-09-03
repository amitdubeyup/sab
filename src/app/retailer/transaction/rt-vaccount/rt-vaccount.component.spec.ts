import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtVaccountComponent } from './rt-vaccount.component';

describe('RtVaccountComponent', () => {
  let component: RtVaccountComponent;
  let fixture: ComponentFixture<RtVaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtVaccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RtVaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
