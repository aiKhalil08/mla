import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawCommissionComponent } from './withdraw-commission.component';

describe('WithdrawCommissionComponent', () => {
  let component: WithdrawCommissionComponent;
  let fixture: ComponentFixture<WithdrawCommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithdrawCommissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WithdrawCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
