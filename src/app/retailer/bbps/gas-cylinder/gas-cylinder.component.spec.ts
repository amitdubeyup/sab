import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasCylinderComponent } from './gas-cylinder.component';

describe('GasCylinderComponent', () => {
  let component: GasCylinderComponent;
  let fixture: ComponentFixture<GasCylinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GasCylinderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GasCylinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
