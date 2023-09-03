import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DthComponent } from './dth.component';

describe('DthComponent', () => {
  let component: DthComponent;
  let fixture: ComponentFixture<DthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
