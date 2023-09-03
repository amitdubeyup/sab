import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmtServiceManagerComponent } from './dmt-service-manager.component';

describe('DmtServiceManagerComponent', () => {
  let component: DmtServiceManagerComponent;
  let fixture: ComponentFixture<DmtServiceManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmtServiceManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmtServiceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
