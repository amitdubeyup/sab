import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistCommComponent } from './dist-comm.component';

describe('DistCommComponent', () => {
  let component: DistCommComponent;
  let fixture: ComponentFixture<DistCommComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistCommComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistCommComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
