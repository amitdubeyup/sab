import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMemberTypeComponent } from './create-member-type.component';

describe('CreateMemberTypeComponent', () => {
  let component: CreateMemberTypeComponent;
  let fixture: ComponentFixture<CreateMemberTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMemberTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMemberTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
