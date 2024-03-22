import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FulfillmentsComponent } from './fulfillments.component';

describe('FulfillmentsComponent', () => {
  let component: FulfillmentsComponent;
  let fixture: ComponentFixture<FulfillmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FulfillmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FulfillmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
