import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadbandComponent } from './broadband.component';

describe('BroadbandComponent', () => {
  let component: BroadbandComponent;
  let fixture: ComponentFixture<BroadbandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BroadbandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BroadbandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
