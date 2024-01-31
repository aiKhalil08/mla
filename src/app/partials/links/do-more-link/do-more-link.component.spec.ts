import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoMoreLinkComponent } from './do-more-link.component';

describe('DoMoreLinkComponent', () => {
  let component: DoMoreLinkComponent;
  let fixture: ComponentFixture<DoMoreLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DoMoreLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoMoreLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
