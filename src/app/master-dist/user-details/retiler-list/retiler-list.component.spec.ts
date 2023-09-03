import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetilerListComponent } from './retiler-list.component';

describe('RetilerListComponent', () => {
  let component: RetilerListComponent;
  let fixture: ComponentFixture<RetilerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetilerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetilerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
