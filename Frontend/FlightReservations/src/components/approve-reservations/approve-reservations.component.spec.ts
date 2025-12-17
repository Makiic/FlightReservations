import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveReservationsComponent } from './approve-reservations.component';

describe('ApproveReservationsComponent', () => {
  let component: ApproveReservationsComponent;
  let fixture: ComponentFixture<ApproveReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveReservationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
