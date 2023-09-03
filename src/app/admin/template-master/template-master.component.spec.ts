import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateMasterComponent } from './template-master.component';

describe('TemplateMasterComponent', () => {
  let component: TemplateMasterComponent;
  let fixture: ComponentFixture<TemplateMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
