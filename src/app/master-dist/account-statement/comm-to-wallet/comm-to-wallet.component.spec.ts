import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommToWalletComponent } from './comm-to-wallet.component';

describe('CommToWalletComponent', () => {
  let component: CommToWalletComponent;
  let fixture: ComponentFixture<CommToWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommToWalletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommToWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
