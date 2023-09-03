import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbpsServiceManagerComponent } from './bbps-service-manager.component';

describe('BbpsServiceManagerComponent', () => {
  let component: BbpsServiceManagerComponent;
  let fixture: ComponentFixture<BbpsServiceManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BbpsServiceManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BbpsServiceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
