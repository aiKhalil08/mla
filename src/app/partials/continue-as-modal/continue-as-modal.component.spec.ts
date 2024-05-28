import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueAsModalComponent } from './continue-as-modal.component';

describe('ContinueAsModalComponent', () => {
  let component: ContinueAsModalComponent;
  let fixture: ComponentFixture<ContinueAsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContinueAsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContinueAsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
