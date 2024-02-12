import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionEventComponent } from './action-event.component';

describe('ActionEventComponent', () => {
  let component: ActionEventComponent;
  let fixture: ComponentFixture<ActionEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ActionEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
