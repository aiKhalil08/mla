import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmProceedModalComponent } from './confirm-proceed-modal.component';

describe('ConfirmProceedModalComponent', () => {
  let component: ConfirmProceedModalComponent;
  let fixture: ComponentFixture<ConfirmProceedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmProceedModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmProceedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
