import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchedEventComponent } from './watched-event.component';

describe('WatchedEventComponent', () => {
  let component: WatchedEventComponent;
  let fixture: ComponentFixture<WatchedEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchedEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WatchedEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
