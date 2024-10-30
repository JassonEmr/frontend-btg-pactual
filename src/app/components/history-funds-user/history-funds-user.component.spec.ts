import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryFundsUserComponent } from './history-funds-user.component';

describe('HistoryFundsUserComponent', () => {
  let component: HistoryFundsUserComponent;
  let fixture: ComponentFixture<HistoryFundsUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryFundsUserComponent]
    });
    fixture = TestBed.createComponent(HistoryFundsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
