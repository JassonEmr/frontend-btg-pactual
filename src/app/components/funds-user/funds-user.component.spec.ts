import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundsUserComponent } from './funds-user.component';

describe('FundsUserComponent', () => {
  let component: FundsUserComponent;
  let fixture: ComponentFixture<FundsUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FundsUserComponent]
    });
    fixture = TestBed.createComponent(FundsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
