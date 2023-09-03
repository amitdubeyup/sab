import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelServiceManagerComponent } from './travel-service-manager.component';

describe('TravelServiceManagerComponent', () => {
  let component: TravelServiceManagerComponent;
  let fixture: ComponentFixture<TravelServiceManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelServiceManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelServiceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
