import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgManagerComponent } from './pg-manager.component';

describe('PgManagerComponent', () => {
  let component: PgManagerComponent;
  let fixture: ComponentFixture<PgManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
