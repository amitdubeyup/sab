import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsServiceManagerComponent } from './cms-service-manager.component';

describe('CmsServiceManagerComponent', () => {
  let component: CmsServiceManagerComponent;
  let fixture: ComponentFixture<CmsServiceManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsServiceManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsServiceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
