import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffLineBillComponent } from './off-line-bill.component';

describe('OffLineBillComponent', () => {
  let component: OffLineBillComponent;
  let fixture: ComponentFixture<OffLineBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffLineBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffLineBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
