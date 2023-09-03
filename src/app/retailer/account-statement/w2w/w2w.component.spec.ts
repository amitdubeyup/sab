import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W2wComponent } from './w2w.component';

describe('W2wComponent', () => {
  let component: W2wComponent;
  let fixture: ComponentFixture<W2wComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W2wComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(W2wComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
