import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionBlogComponent } from './action-blog.component';

describe('ActionBlogComponent', () => {
  let component: ActionBlogComponent;
  let fixture: ComponentFixture<ActionBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ActionBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
