import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbpsLiveServiceManagerComponent } from './bbps-live-service-manager.component';

describe('BbpsLiveServiceManagerComponent', () => {
  let component: BbpsLiveServiceManagerComponent;
  let fixture: ComponentFixture<BbpsLiveServiceManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BbpsLiveServiceManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BbpsLiveServiceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
