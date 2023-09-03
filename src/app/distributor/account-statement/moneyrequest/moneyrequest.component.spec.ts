import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyrequestComponent } from './moneyrequest.component';

describe('MoneyrequestComponent', () => {
  let component: MoneyrequestComponent;
  let fixture: ComponentFixture<MoneyrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyrequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneyrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
