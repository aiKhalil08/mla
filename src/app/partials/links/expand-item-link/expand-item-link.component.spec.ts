import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandItemLinkComponent } from './expand-item-link.component';

describe('ExpandItemLinkComponent', () => {
  let component: ExpandItemLinkComponent;
  let fixture: ComponentFixture<ExpandItemLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ExpandItemLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpandItemLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
