import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavItemDropdownComponent } from './nav-item-dropdown.component';

describe('NavItemDropdownComponent', () => {
  let component: NavItemDropdownComponent;
  let fixture: ComponentFixture<NavItemDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NavItemDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavItemDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
