import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExternalUserComponent } from './edit-external-user.component';

describe('EditExternalUserComponent', () => {
  let component: EditExternalUserComponent;
  let fixture: ComponentFixture<EditExternalUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditExternalUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditExternalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
