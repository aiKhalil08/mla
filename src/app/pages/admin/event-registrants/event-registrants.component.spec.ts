import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRegistrantsComponent } from './event-registrants.component';

describe('EventRegistrantsComponent', () => {
  let component: EventRegistrantsComponent;
  let fixture: ComponentFixture<EventRegistrantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventRegistrantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventRegistrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
