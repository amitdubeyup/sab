import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberTemplateEditComponent } from './member-template-edit.component';

describe('MemberTemplateEditComponent', () => {
  let component: MemberTemplateEditComponent;
  let fixture: ComponentFixture<MemberTemplateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberTemplateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberTemplateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
