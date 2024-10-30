import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationEmailComponent } from './validation-email.component';

describe('ValidationEmailComponent', () => {
  let component: ValidationEmailComponent;
  let fixture: ComponentFixture<ValidationEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidationEmailComponent]
    });
    fixture = TestBed.createComponent(ValidationEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
