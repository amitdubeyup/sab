import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletServiceManagerComponent } from './wallet-service-manager.component';

describe('WalletServiceManagerComponent', () => {
  let component: WalletServiceManagerComponent;
  let fixture: ComponentFixture<WalletServiceManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletServiceManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletServiceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
