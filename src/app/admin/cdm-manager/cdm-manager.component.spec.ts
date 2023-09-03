import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdmManagerComponent } from './cdm-manager.component';

describe('CdmManagerComponent', () => {
  let component: CdmManagerComponent;
  let fixture: ComponentFixture<CdmManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdmManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdmManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
