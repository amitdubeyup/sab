import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssentialServicesComponent } from './essential-services.component';

describe('EssentialServicesComponent', () => {
  let component: EssentialServicesComponent;
  let fixture: ComponentFixture<EssentialServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EssentialServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EssentialServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
